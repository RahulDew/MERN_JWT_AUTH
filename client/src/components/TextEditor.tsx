import { useEffect, useCallback, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
// import "../style.css";
import "@/assets/styles/quillstyles.css"

const TOOLBAR_OPTION = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "orderd" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  [{ direction: "rtl" }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

const TextEditor = () => {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState<any>();
  const [quill, setQuill] = useState<Quill | undefined>();
  const SAVE_INTERVAL_MS = 2000;
  // console.log(documentId)

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document: any) => {
      if (quill) {
        quill.setContents(document);
        quill.enable();
      }
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: any) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== "user") return;
      socket.emit("send-chenges", delta); //sending data to server with send-chenges event
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTION,
      },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);
  return <div className="container" ref={wrapperRef}></div>;
};

export default TextEditor;
