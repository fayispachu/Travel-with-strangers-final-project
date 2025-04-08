import React from "react";

function CreateButton({ openPopup }) {
  return (
    <>
      <button
        onClick={openPopup}
        className="bg-[#33D69F] absolute rounded-md  md:px-16 px-10 py-3 bottom-36 right-10 text-white font-semibold border border-[#33D69F] "
      >
        Create
      </button>
    </>
  );
}

export default CreateButton;
