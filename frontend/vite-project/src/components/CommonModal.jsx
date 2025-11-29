import React from "react";

const CommonModal = ({ modalId, modalTitle, children, btnText, onSubmit }) => {
  return (
    <>
      <div
        class="modal fade"
        id={modalId}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {modalTitle}
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">{children}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              {onSubmit && (
                <button onClick={onSubmit} type="button" class="btn btn-primary">
                  {btnText ? btnText : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonModal;
