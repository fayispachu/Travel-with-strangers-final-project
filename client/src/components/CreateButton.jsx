import React from "react";

function CreateButton({ openPopup }) {



  return (
    <>
      <button
        onClick={openPopup}
        className="bg-[#33D69F] absolute rounded-full   px-3 py-5 bottom-36 right-10 text-white font-semibold border border-[#33D69F] "
      >
        Create
      </button>
    </>
  );
}

export default CreateButton;
