import React, { Component } from "react";
import ChatBot, { Loading } from 'react-simple-chatbot';
import PropTypes from "prop-types";
import logo_huongnghiep from './logo_huongnghiep.jpg';
class Review  extends Component {
  // function CustomChatbot(props)

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }

  componentWillMount() {
    const self = this;
    const { steps } = this.props;
    const data = steps.userinput.value;
    const username = steps.name.value;
    console.log(data)
    const queryUrl = `https://qpotmzm154.execute-api.ap-southeast-1.amazonaws.com/dev/tvts?data=${data}&username=${username}`;

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('readystatechange', readyStateChange);

    function readyStateChange() {
      if (this.readyState === 4) {
        // const data = JSON.parse(this.responseText);
        const data = this.responseText;
        console.log(data)
        // const bindings = data.answer;
        const bindings = data;
        if (bindings && bindings.length > 0) {
          self.setState({ loading: false, result: bindings });
        } else {
          self.setState({ loading: false, result: 'Not found.' });
        }
      }
    }

    xhr.open('GET', queryUrl);
    xhr.send();

    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }

  triggetNext() {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  }


  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div>
        { loading ? <Loading /> : result }

        {/* {
          !loading &&
          <div
            style={{
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            {
              !trigger && 
              <button
                onClick={() => this.triggetNext()}
              >
                Search Again
              </button>
            }
          </div>
        } */}
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Review.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

const config = {
  width: "300px",
  height: "600px",
  floating: true
};

class CustomChatbot extends Component {

    constructor(props) {
    super(props);

    this.state = {
      question: "",
      chatbot_answer: "",
      isLoading: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.chatbot_answer!==this.props.chatbot_answer){
      this.setState({ 
        chatbot_answer: nextProps.chatbot_answer.chatbot_answer,
      })
      // console.log(nextProps.chatbot_answer)
    }
    // const { answer } = this.props.chatbot_answer.chatbot_answer;
    // this.setState({ answer });    
  }

  

  render() {
    // console.log(this.state.chatbot_answer.answer)
    console.log(logo_huongnghiep)
    // const chatbot_answer = this.state.chatbot_answer.answer    
    // console.log(chatbot_answer)
    // const sleep = (milliseconds) => {
    //   return new Promise(resolve => setTimeout(resolve, milliseconds))
    // }
    return (
      <ChatBot
        botAvatar={logo_huongnghiep}
        {...config}
        steps= {[
          {
            id: "1",
            message: "Bạn tên gì ?",
            trigger: "name",
          },
          {
            id: "name",
            user: true,
            trigger: ({value, step }) => {
              console.log(value,step);
              return "3"
            },
          },
          {
            id: "3",
            message: "Xin chào {previousValue}! Tôi có thể giúp gì cho bạn ?",
            trigger: "userinput"
          },
          {
            id: "userinput",
            user: true,
            trigger: "chatbot-answer"
            // trigger: (value) => {
            //   this.props.enterHandler(value)
            //   return "chatbot-answer"
            // }
            // trigger: "7"
          },
          {
            id:"chatbot-answer",
            delay: 500 ,
            component: <Review/>,
            waitAction: true,
            asMessage: true,
            trigger: "continue"
          },
          {
            id:"continue",
            message:"Bạn có hỏi thêm gì không ?",
            trigger: "userinput"
          },
          {
            id:"choose",
            options: [
              {value: "yes", label: "Có", trigger: "9"},
              {value: "no", label:"Không", trigger: "end-message"}
            ]
          },
          {
            id: "9",
            message: "Tôi có thể giúp gì cho bạn ?",
            trigger: "userinput"
          },
          {
            id: "end-message",
            message: "Xin cám ơn và hẹn gặp lại !",
            end: true,
          }
        ]}
      />
    );
  }
}

export default CustomChatbot;
