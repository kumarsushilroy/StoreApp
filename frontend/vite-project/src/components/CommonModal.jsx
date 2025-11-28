import React from "react";

const CommonModal = ({
  showModal,
  setShoModal,
  modalTitle,
  children,
  btnText,
  functionality,
}) => {
  console.log("MODAl value=", showModal);
  return (
    <>
      {/* {showModal && (
        <div className="container">
          <div className="row">
            <div className="col-md-4 shadow mx-auto">
              <div
                class="modal fade"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Modal title
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                       
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
                      <button type="button" class="btn btn-primary">
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}

      <form>
    <div className="mb-3">
      <label className="form-label">Product Name</label>
      <input
        type="text"
        className="form-control"
        // value={productName}
        // onChange={(e) => setProductName(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Price</label>
      <input
        type="number"
        className="form-control"
        // value={price}
        // onChange={(e) => setPrice(e.target.value)}
      />
    </div>
  </form>
    </>
  );
};

export default CommonModal;
