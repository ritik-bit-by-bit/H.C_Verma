type LoaderProps = {
  className?: string;
};

export function Loader({ className }: LoaderProps) {
  return (
    <div className={className}>
      <div className="pl-loader" aria-label="Loading" role="status">
        <div className="pl-loader__nucleus" />
        <div className="pl-loader__ring" />
        <div className="pl-loader__ring" />
        <div className="pl-loader__ring" />
        <div className="pl-loader__ring" />
        <div className="pl-loader__ring" />
        <div className="pl-loader__ring" />
      </div>
    </div>
  );
}

