"""
Async video streaming server that fetches videos using OpenCV and
serves them over Websockets(default port 8765)
Connect at http://<SERVER_URL>:8765/media/<camera_name> to receive a
video stream as mjpeg format
"""
import websockets
import cv2
import threading
import time
import asyncio
import base64

from multiprocessing import Pool
import datetime
from ultralytics import YOLO
import cv2
from helper import create_video_writer
from deep_sort_realtime.deepsort_tracker import DeepSort
from collections import Counter
import numpy as np
import json
from colormap import rgb2hex
# prefilled for demo purposes, load these from db for actual uses
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2101
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2201
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2001
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1001
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/601
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1201
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1301
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1601
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1401
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1501
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2301
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2401
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/401
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/501
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/901
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/101
#rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1101

STREAMS = {
    # "corner": "http://145.232.236.102/axis-cgi/mjpg/video.cgi",
    "cam1": "rtsp://localhost:8554/coffee1",
    "cam2": "rtsp://localhost:8554/coffee2",
    "cam3": "rtsp://localhost:8554/coffee3",
    "cam4": "rtsp://localhost:8554/coffee4",
    "cam5": "rtsp://localhost:8554/coffee5",
    "cam6": "rtsp://localhost:8554/coffee6",
    # "cam6": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1901",
    # "cam7": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1701",
    # "cam8": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1801",
    # "cam9": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2101",
    # "cam10": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2201",
    # "cam11": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2001",
    # "cam12": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1001",
    # "cam13": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/601",
    # "cam14": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1201",
    # "cam15": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1301",
    # "cam16": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1601",
    # "cam17": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1401",
    # "cam18": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/1501",
    # "cam19": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2301",
    # "cam20": "rtsp://kp4:hq-123456@anphukp4.vncctv.com:1026/Streaming/Unicast/channels/2401"
    # "zurich": "./video_stream/1.mov"
}

CONFIDENCE_THRESHOLD = 0.5
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

np.random.seed(42)  # to get the same colors
colors = np.random.randint(0, 255, size=(10, 3))  # (80, 3)
color_ = {}
class Camera(threading.Thread):
    def __init__(self, url):
        threading.Thread.__init__(self)
        self.url = url
        self.cap = cv2.VideoCapture(url)
        ret, self.frame = self.cap.read()
        self.last_frame_time = time.time()
        # print(ret)

    
    def run(self):
        print("Started streaming from " + self.url)        
        self.frame_n = 0
        frame_rate = 5
        prev = 0
        time_elapsed = time.time() - prev
        # load the pre-trained YOLOv8n model
        model = YOLO("best.pt")
        model.to('cuda')
        names = model.names
        tracker = DeepSort(max_age=5)
        count = []
        tracking_id = []
        while True:
            try:
                if time_elapsed > 1./frame_rate:
                    prev = time.time()
                    self.frame_n += 1
                    start = datetime.datetime.now()
                    ret, frame = self.cap.read()
                    self.last_frame_time = time.time()
                    retval, buffer_img = cv2.imencode('.jpg', frame)
                    self.frame_raw = base64.b64encode(buffer_img)
                    # if not ret:
                    #     print("error fetching stream")
                    #     time.sleep(1)
                    #     continue

                    # run the YOLO model on the frame
                    detections = model(frame)[0]

                    # initialize the list of bounding boxes and confidences
                    results = []                
                    class_id = []                

                    ######################################
                    # DETECTION
                    ######################################

                    # loop over the detections
                    for data in detections.boxes.data.tolist():
                        # extract the confidence (i.e., probability) associated with the prediction
                        confidence = data[4]

                        # filter out weak detections by ensuring the 
                        # confidence is greater than the minimum confidence
                        if float(confidence) < CONFIDENCE_THRESHOLD:
                            continue

                        # if the confidence is greater than the minimum confidence,
                        # get the bounding box and the class id
                        xmin, ymin, xmax, ymax = int(data[0]), int(data[1]), int(data[2]), int(data[3])
                        class_id = int(data[5])
                        # add the bounding box (x, y, w, h), confidence and class id to the results list
                        results.append([[xmin, ymin, xmax - xmin, ymax - ymin], confidence, class_id])

                    ######################################
                    # TRACKING
                    ######################################

                    # update the tracker with the new detections
                    try:
                        tracks = tracker.update_tracks(results, frame=frame)
                        # loop over the tracks
                        for track in tracks:
                            # if the track is not confirmed, ignore it
                            if not track.is_confirmed():
                                continue

                            # print(json.loads(track))
                            # get the track id and the bounding box
                            track_id = track.track_id
                            ltrb = track.to_ltrb()
                            name = track.det_class
                            # print(name)

                            if track_id not in tracking_id:
                                tracking_id.append(track_id)
                                count.append(str(names[name]))

                            xmin, ymin, xmax, ymax = int(ltrb[0]), int(
                                ltrb[1]), int(ltrb[2]), int(ltrb[3])
                            # draw the bounding box and the track id
                            
                            # (h, w) = frame.shape[:2]
                            # (cX, cY) = (w // 2, h // 2) 
                            # M = cv2.getRotationMatrix2D((cX, cY), 90, 1.0)
                            # frame = cv2.warpAffine(frame, M, (w, h))                    
                            # val = Counter(count)
                            # if names[name] not in count:                        
                            #     count[class_name] = 1
                            # else:
                            #     count[class_name] += 1

                            color = colors[name]                    
                            B, G, R = int(color[0]), int(color[1]), int(color[2])
                            color_[names[name]] = rgb2hex(R, G, B)
                            
                            cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), (B, G, R), 2)
                            cv2.rectangle(frame, (xmin, ymin - 20), (xmin + 20, ymin), (B, G, R), -1)
                            cv2.putText(frame, str(track_id) + '-' + str(names[name]), (xmin + 5, ymin - 8),
                                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (B, G, R), 2)

                        # end time to compute the fps
                        end = datetime.datetime.now()
                        # show the time it took to process 1 frame
                        # print(f"Time to process 1 frame: {(end - start).total_seconds() * 1000:.0f} milliseconds")
                        # calculate the frame per second and draw it on the frame
                        fps = f"FPS: {1 / (end - start).total_seconds():.2f}"
                        cv2.putText(frame, fps, (50, 50),
                                    cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 8)
                        # cv2.putText(frame, str(Counter(count)), (100, 100),
                        #             cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 8)

                        # frame = cv2.resize(frame, (640, 480))            
                        retval, buffer_img = cv2.imencode('.jpg', frame)
                        # print(base64.b64encode(buffer_img))
                        self.frame = base64.b64encode(buffer_img)
                        self.count = dict(Counter(count))
                        self.color_ = dict(color_)
                    except:
                        continue
            except:
                continue
        
cameras = {camera: Camera(url) for camera, url in STREAMS.items()}

async def media_server(websocket, path):
    # accepted path: /media/<camera>
    try:
        if not path.startswith("/media/"):
            await websocket.send("invalid path")
            return
        camera = path.replace("/media/", "")
        print(f"streaming {camera} to {websocket}")
        last_frame_time = 0
        if camera in cameras:
            stream = cameras[camera]
            # print(stream)
            while True:
                # check for new frame
                # print(stream.frame)
                if stream.last_frame_time > last_frame_time:
                    last_frame_time = stream.last_frame_time                             
                    # await websocket.send(str(stream.frame.ecode("utf-8")))
                    await websocket.send(json.dumps({
                        'src': str(stream.frame.decode("utf-8")),
                        'raw': str(stream.frame_raw.decode("utf-8")),
                        'count': str(stream.count),
                        'color': str(stream.color_)
                        }))
                await asyncio.sleep(0.04)                
        await websocket.send(f"bye bye {camera}")
    except:
        pass

if __name__ == "__main__":
    for cam in cameras.values():
        cam.start()
    
    # pool = Pool()                         # Create a multiprocessing Pool
    # pool.map(cam.start(), [cam for cam in cameras.values()])  # process data_inputs iterable with pool

    start_server = websockets.serve(media_server, "0.0.0.0", 5005)

    loop = asyncio.get_event_loop()
    loop.run_until_complete(start_server)
    loop.run_forever()
