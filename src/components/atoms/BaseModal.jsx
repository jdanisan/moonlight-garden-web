export function BaseModal({ title, children, onClose, type }) {
  return (
    <div className="flex fixed justify-center top-0 left-0 w-full h-screen  bg-[rgba(0,0,0,0.6)] items-center z-999 ">
      <div className={`bg-primary-50 px-5 pb-5 rounded-xl w-4/5 max-h-[80vh] overflow-y-auto modal-content--${type}`}>
        <div className="flex justify-center  w-full p-4 box-border bg-primary-50 border-b border-b-card sticky top-0! z-30">
          <h2 className="flex items-center font-['Segoe_UI','Arial','sans-serif'] text-4xl justify-center text-primary-700 font-bold">{title}</h2>
          <span className="cursor-pointer absolute text-[24px] right-0 top-2 " onClick={onClose}>
            &times;
          </span>
        </div>
        {type === "location" || type === "episode" ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 mt-5 text-center">{children}</div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
