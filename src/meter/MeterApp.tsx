import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';

export default function MeterApp() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [reading, setReading] = useState('');
  const [header, setHeader] = useState(localStorage.getItem('emailHeader') || '');
  const [footer, setFooter] = useState(localStorage.getItem('emailFooter') || '');
  const [email, setEmail] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) return;
    const s = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) {
      videoRef.current.srcObject = s;
    }
    setStream(s);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      readText(canvas);
    }
  };

  const readText = async (canvas: HTMLCanvasElement) => {
    setProcessing(true);
    const dataUrl = canvas.toDataURL('image/png');
    try {
      const { data } = await Tesseract.recognize(dataUrl, 'eng');
      const digits = data.text.match(/\d+/g)?.join('') || '';
      setReading(digits);
    } finally {
      setProcessing(false);
    }
  };

  const savePrefs = () => {
    localStorage.setItem('emailHeader', header);
    localStorage.setItem('emailFooter', footer);
    alert('Saved');
  };

  const sendEmail = () => {
    const body = `${header}\n\nReading: ${reading}\n\n${footer}`;
    const url =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      `&to=${encodeURIComponent(email)}` +
      `&su=${encodeURIComponent('Meter Reading')}` +
      `&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Meter Reading</h1>
      <div className="space-x-2">
        <button
          onClick={startCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start Camera
        </button>
        <button
          onClick={capturePhoto}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Capture &amp; Read
        </button>
      </div>
      <video ref={videoRef} autoPlay className="w-full max-w-md" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {processing && <p>Processing...</p>}
      <div>
        <label className="block">Reading</label>
        <input
          className="border p-2 w-full max-w-md"
          value={reading}
          onChange={e => setReading(e.target.value)}
        />
      </div>
      <div>
        <label className="block">Email Header</label>
        <textarea
          className="border p-2 w-full max-w-md"
          value={header}
          onChange={e => setHeader(e.target.value)}
        />
      </div>
      <div>
        <label className="block">Email Footer</label>
        <textarea
          className="border p-2 w-full max-w-md"
          value={footer}
          onChange={e => setFooter(e.target.value)}
        />
      </div>
      <div>
        <label className="block">Send To</label>
        <input
          className="border p-2 w-full max-w-md"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="space-x-2">
        <button onClick={savePrefs} className="px-4 py-2 bg-gray-300 rounded">Save Header/Footer</button>
        <button onClick={sendEmail} className="px-4 py-2 bg-blue-600 text-white rounded">Send Email</button>
      </div>
    </div>
  );
}
