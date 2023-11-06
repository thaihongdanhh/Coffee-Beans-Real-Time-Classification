from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

import uvicorn

import datetime
from ultralytics import YOLO
import cv2
from helper import create_video_writer
from deep_sort_realtime.deepsort_tracker import DeepSort
from typing import Annotated
from fastapi import FastAPI, File, UploadFile
import numpy as np
import base64
from collections import Counter
from colormap import rgb2hex


some_file_path = "1.mp4"
app = FastAPI()

origins = [       
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CONFIDENCE_THRESHOLD = 0.5
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

np.random.seed(42)  # to get the same colors
colors = np.random.randint(0, 255, size=(10, 3))  # (80, 3)
color_ = {}
color__ = {}
# load the pre-trained YOLOv8n model
model = YOLO("yolov8n.pt")
tracker = DeepSort(max_age=50)  

CONFIDENCE_THRESHOLD = 0.5
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

# load the pre-trained YOLOv8n model
model = YOLO("best.pt")
model.to('cuda')
names = model.names

@app.post("/upload")
async def upload_image(
    files: Annotated[
        list[UploadFile], File(description="Multiple files as UploadFile")
    ],
    ):    

    file_raw = []
    file_process = []
    image = []
    count = []
    for file in files:
        start = datetime.datetime.now()
        # contents = file.read()
        # nparr = np.fromstring(contents, np.uint8)
        file_path = 'uploads/' + 'raw-' + file.filename
        file_raw.append(file_path)
        with open(file_path,'wb+') as f:
            f.write(file.file.read())
            f.close()
        frame = cv2.imread(file_path, cv2.IMREAD_COLOR)              
        # frame = cv2.imread(file.read())
        detections = model(frame)[0]

        # initialize the list of bounding boxes and confidences
        results = []

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
            # results.append([[xmin, ymin, xmax - xmin, ymax - ymin], confidence, class_id])      
            count.append(str(names[int(class_id)]))        
            color = colors[class_id]                    
            B, G, R = int(color[0]), int(color[1]), int(color[2])
            color_[names[class_id]] = rgb2hex(R, G, B)      
            color__[names[class_id]] = (B, G, R)
            cv2.rectangle(frame, (xmin, ymin) , (xmax, ymax), (B, G, R), 2)
            cv2.putText(frame, str(names[int(class_id)]), (xmin + 5, ymin - 8),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (B, G, R), 2)

        
        # end time to compute the fps
        end = datetime.datetime.now()
        # show the time it took to process 1 frame
        # print(f"Time to process 1 frame: {(end - start).total_seconds() * 1000:.0f} milliseconds")
        # calculate the frame per second and draw it on the frame
        # fps = f"FPS: {1 / (end - start).total_seconds():.2f}"
        # cv2.putText(frame, fps, (50, 50),
        #             cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 255), 8)

        n = 1
        # for i in list(dict(Counter(count)).keys()):
        #     color = color__[i]                                
        #     cv2.putText(frame, i + ':' + str(dict(Counter(count))[i]), (15, 50 * n),
        #                 cv2.FONT_HERSHEY_SIMPLEX, 2, color, 8)
            
        #     n+=2

        for i in list(dict(Counter(count)).keys()):
            color = color__[i]                                
            cv2.putText(frame, i + ':' + str(dict(Counter(count))[i]), (15, 30 * n),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
            
            n+=1

        cv2.imwrite(file_path.replace('raw-',''), frame)
        file_process.append(file_path.replace('raw-',''))
        # retval, buffer_img = cv2.imencode('.jpg', frame)
        # frame = base64.b64encode(buffer_img)        
        image.append({'file_raw': file_path, 'file_process': file_path.replace('raw-',''), 'count': dict(Counter(count)), 'color': color_})
  

    return image


@app.post("/upload2")
async def upload_image2(
    files: Annotated[
        list[UploadFile], File(description="Multiple files as UploadFile")
    ],
    ):    

    file_raw = []
    file_process = []
    image = []
    count = []
    for file in files:
        start = datetime.datetime.now()
        # contents = file.read()
        # nparr = np.fromstring(contents, np.uint8)
        file_path = 'uploads/' + 'raw-' + file.filename
        file_raw.append(file_path)
        with open(file_path,'wb+') as f:
            f.write(file.file.read())
            f.close()
        frame = cv2.imread(file_path, cv2.IMREAD_COLOR)     
        frame = cv2.flip(frame, 1)   
        # frame = cv2.imread(file.read())
        detections = model(frame)[0]

        # initialize the list of bounding boxes and confidences
        results = []

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
            # results.append([[xmin, ymin, xmax - xmin, ymax - ymin], confidence, class_id])      
            count.append(str(names[int(class_id)]))        
            color = colors[class_id]                    
            B, G, R = int(color[0]), int(color[1]), int(color[2])
            color_[names[class_id]] = rgb2hex(R, G, B)      
            color__[names[class_id]] = (B, G, R)
            cv2.rectangle(frame, (xmin, ymin) , (xmax, ymax), (B, G, R), 2)
            cv2.putText(frame, str(names[int(class_id)]), (xmin + 5, ymin - 8),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (B, G, R), 2)

        
        # end time to compute the fps
        end = datetime.datetime.now()
        # show the time it took to process 1 frame
        # print(f"Time to process 1 frame: {(end - start).total_seconds() * 1000:.0f} milliseconds")
        # calculate the frame per second and draw it on the frame
        # fps = f"FPS: {1 / (end - start).total_seconds():.2f}"
        n = 1
        for i in list(dict(Counter(count)).keys()):
            color = color__[i]                                
            cv2.putText(frame, i + ':' + str(dict(Counter(count))[i]), (15, 30 * n),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, color, 2)
            
            n+=1

        cv2.imwrite(file_path.replace('raw-',''), frame)
        file_process.append(file_path.replace('raw-',''))
        retval, buffer_img = cv2.imencode('.jpg', frame)
        frame = base64.b64encode(buffer_img)        
        image.append({'file_process': 'data:image/png;base64,' + frame.decode('utf8'), 'count': dict(Counter(count)), 'color': color_})
  

    return image

@app.get("/image")
def fetch_image(
    file_path: str):    
    image_file = open(file_path,mode="rb")
    # im_png = cv2.imdecode(resized, cv2.IMREAD_COLOR)
    # im_png = cv2.imencode(".png", resized)

    return StreamingResponse(image_file, media_type="image/jpg")


if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=5003
        )