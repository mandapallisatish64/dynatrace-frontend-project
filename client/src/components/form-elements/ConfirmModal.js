import React from "react";

const ConfirmModal = ({
  title,
  content,
  onOkClickHandler,
  onCancelClickhandler,
}) => {
  console.log("confiem modal--------");
  return (
    <div
      class="modal"
      tabindex="-1"
      id="myModal"
      role="dialog"
      style={{ display: "block" }}
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={
                title === "Confirmation Modal"
                  ? onCancelClickhandler
                  : onOkClickHandler
              }
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{content}</p>
          </div>
          <div class="modal-footer">
            {title === "Confirmation Modal" ? (
              <div className="delete-sales-modal-btnwrapper">
                <button
                  type="button"
                  class="btn btn-primary delete-sales-nobtn"
                  onClick={onCancelClickhandler}
                >
                  No
                </button>
                <button
                  type="button"
                  class="btn btn-primary delete-sales-okbtn"
                  onClick={onOkClickHandler}
                >
                  Yes
                </button>
              </div>
            ) : (
              <button
                type="button"
                class="btn btn-primary"
                onClick={onOkClickHandler}
              >
                OK
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
