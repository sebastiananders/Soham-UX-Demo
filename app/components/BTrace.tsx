export function BTrace({ size = 48, label }: { size?: number; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <style>{`@keyframes bTrace{0%{stroke-dashoffset:1200}100%{stroke-dashoffset:0}}`}</style>
      <svg width={size} height={size} viewBox="50 35 120 150" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M150.2 104.8C154.8 99.5 157.4 93.3001 157.4 86.6001C157.4 61.7001 138.7 43.3 98.7 43.3C75.8 43.3 58.7 50.0001 58.7 50.0001L64.7 66.0001C64.7 66.0001 77 59.3 98.7 59.3C120.4 59.3 141.4 65.5001 141.4 86.6001C141.4 89.8001 140.6 92.4001 139.1 94.6001C122.8 82.1001 101.8 74.6001 85.4 74.6001C76.1 74.6001 62.1 79.3001 62.1 92.6001C62.1 113.9 94.8 119.9 112.1 119.9C121.8 119.9 130.5 117.8 137.7 114.3C144.3 121.5 148.8 130.3 148.8 140.6C148.8 156.4 132.1 159.9 122.8 159.9C97.5 159.9 82.8 142.8 78.1 132.6L62.8 136.6V172.6H78.8V159.3C78.8 159.3 94.9 176.6 122.8 176.6C149.5 176.6 165.5 160.9 165.5 140.6C165.4 127.1 159.4 114.9 150.2 104.8ZM78.8 94.0001C78.8 87.3001 103.7 90.6001 123.8 103.1C105.2 106.6 78.8 99.9001 78.8 94.0001Z"
          fill="none" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ strokeDasharray: '400 800', animation: 'bTrace 2.5s linear infinite' }}
        />
      </svg>
      {label && <p className="text-sm text-neutral-400">{label}</p>}
    </div>
  );
}
