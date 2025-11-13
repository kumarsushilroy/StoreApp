
import React from 'react'

const UploadAvatar = () => {
  return (
     <div class="row wrapper">
      <div class="col-10 col-lg-3">
        <form
          class="shadow rounded bg-body"
          action="#"
          method="post"
          enctype="multipart/form-data"
        >
          <h2 class="mb-4">Upload Avatar</h2>

          <div class="mb-3">
            <div class="d-flex align-items-center">
              <div class="me-3">
                <figure class="avatar item-rtl">
                  <img src="" class="rounded-circle" alt="image" />
                </figure>
              </div>
              <div class="input-foam">
                <label class="form-label" for="customFile">
                  Choose Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  class="form-control"
                  id="customFile"
                  accept="images/*"
                />
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            class="btn w-100 py-2"
            disabled=""
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadAvatar