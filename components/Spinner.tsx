export default function Spinner() {
  return (
    <div className="relative">
      <div className="spinner" />

      <style jsx>{`
        @keyframes spinner {
          to {transform: rotate(360deg);}
        }

        .spinner:before {
          content: '';
          box-sizing: border-box;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          margin-top: -10px;
          margin-left: -10px;
          border-radius: 50%;
          border: 2px solid #ccc;
          border-top-color: #000;
          animation: spinner .6s linear infinite;
      `}</style>
    </div>
  );
}
