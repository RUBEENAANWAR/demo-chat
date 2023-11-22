import React, { useState, useEffect } from "react";
import Peer from "peerjs";

const PeerConnection = () => {
  const [conn, setConn] = useState(null);
  const [title] = useState("demo-chat");
  const [peer, setPeer] = useState(null);
  const [message, setMessage] = useState("");
  const [peerId, setPeerId] = useState('');

  const createPeer = () => {
    console.log(1, peer);
    if (peer) {
      return;
    }
    const newPeer = new Peer("alavalaathi-rubeena");
    setPeer(newPeer);
    console.log("created");
  };

  // const establishConnection = () => {
  //   if (peer) {
  //     const newConn = peer.connect("maanyanaaya-dheeraj");
  //     newConn.on("open", () => {
  //       newConn.send(message);
  //     });
  //     setConn(newConn);
  //   }
  // };

  const establishConnection = () => {
    if (peerId && peer) {
      const newConn = peer.connect(peerId);
      newConn.on("open", () => {
        newConn.send(message);
      });
      setConn(newConn);
    }
  };


  const receive = () => {
    if (peer) {
      peer.on("connection", (conn) => {
        conn.on("data", (data) => {
          console.log(data);
        });
      });
    }
  };

  return (
    <div style={{display:'flex', flexDirection:'column'}}>
      <h1>{title}</h1>
      <label>
        Other Person's ID:
        <input
          type="text"
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
        />
      </label>
      <div style={{width:'10%', display:'flex',flexDirection:'colum', justifyContent:'center', alignItems:'center'}}>
      <button onClick={createPeer}>Create Peer</button>
      <button onClick={establishConnection}>Establish Connection</button>
      {/* <button onClick={send}>Send Message</button> */}
      <button onClick={receive}>Receive Message</button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={establishConnection}>Send</button>
      </div>
    </div>
  );
};

export default PeerConnection;
