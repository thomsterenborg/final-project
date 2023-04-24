export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="p-card w-full max-w-1200 p-2 text-center mt-4">
      <p>Created by Thom Sterenborg © {year} </p>
    </div>
  );
};
