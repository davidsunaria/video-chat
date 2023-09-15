import React, { useState, useEffect, useRef } from "react";
import OT from "@opentok/client";
import { VideoServices } from "./videoService";

const apiKey = "47411121";
const secret = "b1d651fd2f0cbd2b17fe57dbf365a0bafb567fe0";
const sessionId =
  "2_MX40NzQxMTEyMX5-MTY3OTQ2NTk5OTE3Mn5nd2VWUWt5ZGpoeHRTTGdudExyM1ZUZEp-QX5-";
const token =
  "T1==cGFydG5lcl9pZD00NzQxMTEyMSZzaWc9NWE1OWNiNDY5OTYyZDhhNDA1MWZiNmFlZGFiNGY0YTk5ZjhmMjk0YTpzZXNzaW9uX2lkPTJfTVg0ME56UXhNVEV5TVg1LU1UWTNPVFEyTlRrNU9URTNNbjVuZDJWV1VXdDVaR3BvZUhSVFRHZHVkRXh5TTFaVVpFcC1RWDUtJmNyZWF0ZV90aW1lPTE2Nzk0NjczMjYmbm9uY2U9MC43MDkwNTM3Mzk3MDc4NTA5JnJvbGU9cHVibGlzaGVyJmV4cGlyZV90aW1lPTE2Nzk1NTM3MjYmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0=";

export const Video = () => {
  const [video, setVideo] = useState<any>(true);
  const [videoScreen, setVideoScreen] = useState<any>(false);
  const [swipe, setSwipe] = useState<any>(false);
  const subscriberRef = useRef<any>(null);
  const publisherRef = useRef<any>(null);
  const subscriberDivRef = useRef<any>(null);
  const publisherDivRef = useRef<any>(null);
  // Handling all of our errors here by alerting them
  function handleError(error: any) {
    if (error) {
      alert(error.message);
    }
  }

  function initializeSession() {
  
    
    var session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
  var subscriber=  session.on("streamCreated", function (event) {
        session.subscribe(
        event.stream,
        "subscriber",
        {
          insertMode: "append",
          width: "500px",
          height: "500px",
          subscribeToVideo:true
        },
        handleError
      );
      
      //  subscriber.subscribeToVideo(video);
    });
    subscriberRef.current = subscriber;
    console.log("session", session);
    // Create a publisher
    var publisher = OT.initPublisher(
      "publisher",

      {
        insertMode: "append",
        width: "100%",
        height: "100%",
        
      },
      handleError
    );
    publisherRef.current = publisher;
    //  console.log("publisherRef.current",publisherRef.current.element)
    console.log(document.getElementById("publisher"))
 let  customPublisher:any = document.getElementById("publisher")
 console.log("customPublisher",customPublisher)
//  customPublisher.appendChild(publisherRef.current.element);
    // Connect to the session
    session.connect(token, function (error) {
      // If the connection is successful, initialize a publisher and publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
   
    setVideoScreen(true)
    
  }

  const videoOnOff= ()=>{
    if ( publisherRef?.current) {
      if ( publisherRef?.current?.stream?.hasVideo) {
        publisherRef?.current?.publishVideo(false);
      } else {
        publisherRef?.current?.publishVideo(true);
      }
    }
  }
  console.log("publisherRef",publisherRef?.current?.id)
  console.log("publisherRef",publisherRef?.current)
  console.log("subscriberRef",subscriberRef?.current)

  
  const takeSnapShot= ()=>{
      const imgData=  publisherRef?.current?.getImgData();
      // console.log("imgData",imgData)
      var img = document.createElement("img");
     img.setAttribute("src", "data:image/png;base64," + imgData);
 var imgWin:any = window.open("about:blank", "Screenshot");
  imgWin.document.write(img);
  imgWin.document.body.appendChild(img);
  }
 
  const demo1 = ()=>{
   // console.log("publisherRef?.current.element",publisherRef?.current?.element?.id)
   // var publisherDiv = publisherRef?.current?.element
     //document.getElementById(publisherRef?.current?.element?.id)
    var parent:any= document.getElementById("subscriber")
   // console.log("parent",parent)
    var subScriberDiv= parent.childNodes[0]
    var childs = parent.childNodes[0].id;
//console.log(publisherDiv,parent.childNodes[0]);
// [publisherDiv.className,subScriberDiv.className]=[subScriberDiv.className,publisherDiv.className]
    // if ( publisherRef?.current) {
    //   publisherRef?.current.setStyle("archiveStatusDisplayMode ", "auto");
    // }
    // const tempStyle=publisherDiv.style.cssText
    // publisherDiv.style.cssText=subScriberDiv.style.cssText
    // subScriberDiv.style.cssText=tempStyle
    var publisherDiv:any= document.getElementById("publisher")
    console.log(parent,publisherDiv)
    console.log(parent.firstChild,publisherDiv.firstChild)
  //  [publisherDiv.className,subScriberDiv.className]=[subScriberDiv.className,publisherDiv.className]

  
const tempFirstChild = publisherDiv.firstChild;
publisherDiv.removeChild(tempFirstChild);
parent.insertBefore(tempFirstChild, parent.firstChild);

parent.removeChild(parent.firstChild);
publisherDiv.insertBefore(tempFirstChild, publisherDiv.firstChild);
setSwipe(!swipe)
    // console.log(publisherDiv)
    // console.log(parent)
    // const tempId=publisherDiv?.id
    //  publisherDiv.id=parent?.id
    //  parent.id=tempId


    // const tempChildNodes = publisherDiv.childNodes;
    // while (publisherDiv.firstChild) {
    //   publisherDiv.removeChild(publisherDiv.firstChild);
    // }
    // for (let i = 0; i < parent.childNodes.length; i++) {
    //   publisherDiv.appendChild(parent.childNodes[i].cloneNode(true));
    // }

    // while (parent.firstChild) {
    //   parent.removeChild(parent.firstChild);
    // }
    // for (let i = 0; i < tempChildNodes.length; i++) {
    //   parent.appendChild(tempChildNodes[i].cloneNode(true));
    // }
  }

  const demo =()=>{

//     const tempFirstChild:any = subscriberDivRef.current.firstChild;
// console.log("ref",subscriberDivRef.current,publisherDivRef.current)
// console.log("firstchild",subscriberDivRef.current.firstChild,publisherDivRef.current.firstChild)
//    subscriberDivRef.current.removeChild(tempFirstChild);
//    publisherDivRef.current.insertBefore(tempFirstChild, publisherDivRef.current.firstChild);
//   //  subscriberDivRef.current.removeChild(tempFirstChild);
//   //  subscriberDivRef.current.appendChild(publisherDivRef.current.firstChild);

//     publisherDivRef.current.removeChild(publisherDivRef.current.firstChild);
//     //publisherDivRef.current.appendChild(tempFirstChild);
//   subscriberDivRef.current.insertBefore(tempFirstChild, subscriberDivRef.current.firstChild);
//   console.log("updated ref",subscriberDivRef.current,publisherDivRef.current)
const temp = subscriberDivRef.current.innerHTML;
subscriberDivRef.current.innerHTML = publisherDivRef.current.innerHTML;
publisherDivRef.current.innerHTML = temp;
// const tempId = subscriberDivRef.current.id;
// subscriberDivRef.current.id = publisherDivRef.current.id;
// publisherDivRef.current.id = tempId;
  }
  return (
    <>
   
    {videoScreen?
    <div id="videos">
        <div id="subscriber" ref={subscriberDivRef} ></div>
         
      </div>
       :null}   
      <div>
      <div id="publisher" style={{border:"none"}} ref={publisherDivRef}></div> 
      <button onClick={initializeSession}>video call start</button>
        {/* <button onClick={VideoServices?.init()}>video call start</button> */}
        <button onClick={videoOnOff}>video on/off</button>
        <button onClick={takeSnapShot}>Take Snapshot</button>
        <button onClick={demo}>demo</button>
      </div>
    </>
  );
};

