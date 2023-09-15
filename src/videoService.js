import OT from "@opentok/client";
const apiKey = "47411121";
const sessionId ="1_MX40NzQxMTEyMX5-MTY3ODk2OTc3MjA5N34vWFlRK1h0N2xkN3BHbzBiNk1SWTl0c1B-QX5-";
const token = "T1==cGFydG5lcl9pZD00NzQxMTEyMSZzaWc9ZGMxNThhODM4Y2IzMDdmM2JlNDFhNTJkMGQyYzUxOGMxNmU0MzU2MDpzZXNzaW9uX2lkPTFfTVg0ME56UXhNVEV5TVg1LU1UWTNPRGsyT1RjM01qQTVOMzR2V0ZsUksxaDBOMnhrTjNCSGJ6QmlOazFTV1RsMGMxQi1RWDUtJmNyZWF0ZV90aW1lPTE2NzkwMzY2MTAmbm9uY2U9MC40NTU0ODg4MzM0MTM5MTc3NyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjc5MTIzMDEwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

class MyVideoServices {
  static singleToneObject 
   VideoInstance
   session 
   subscriber
   publisher
  static getSingleToneObject() {
    if (!MyVideoServices.singleToneObject) {
      MyVideoServices.singleToneObject = new MyVideoServices(); 
    }
    return MyVideoServices.singleToneObject;
  }
 handleError(error) {
    if (error) {
      alert(error.message);
    }
  }

 init (){
console.log("init")
    this.VideoInstance= {
      apiKey:apiKey,
      sessionId:sessionId,
      token:token
     }

    this.session = OT?.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
   this.subscriber= this.session?.on("streamCreated", function (event) {
      this.session?.subscribe(
        event.stream,
        "subscriber",
        {
          insertMode: "append",
          width: "500px",
          height: "500px",
          subscribeToVideo: false,
        },
        this.handleError
      );

      this.publisher = OT.initPublisher(
        "publisher",
  
        {
          insertMode: "append",
          width: "100%",
          height: "100%",
        },
      );

      this.session.connect(token, function (error) {
        // If the connection is successful, initialize a publisher and publish to the session
        if (error) {
          this.handleError(error);
        } else {
          this.session?.publish(this.publisher, this.handleError);
        }
      });

      //  subscriber.subscribeToVideo(video);
    });
  }

  changeSession(value){
      // this.subscriber.subscribeToVideo(false);

      this?.publisher?.publishVideo(value);
    }
  }


 
  





export const VideoServices =  MyVideoServices.getSingleToneObject();

