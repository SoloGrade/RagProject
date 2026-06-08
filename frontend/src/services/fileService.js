import axios from 'axios'

const API_BASE =
  'http://127.0.0.1:8000'

// ---------------------------------------------------
// UPLOAD FILES
// ---------------------------------------------------

export async function uploadFiles(

  files,

  workspaceId,

  onUploadProgress
) {

  const formData =
    new FormData()

  // ---------------------------------------------------
  // WORKSPACE ID
  // ---------------------------------------------------

  formData.append(

    'workspace_id',

    workspaceId
  )

  // ---------------------------------------------------
  // FILES
  // ---------------------------------------------------

  for (
    let i = 0;
    i < files.length;
    i++
  ) {

    formData.append(

      'files',

      files[i]
    )
  }

  // ---------------------------------------------------
  // REQUEST
  // ---------------------------------------------------

  const response =
    await axios.post(

      `${API_BASE}/upload`,

      formData,

      {

        headers: {

          'Content-Type':
            'multipart/form-data',
        },

        onUploadProgress:
          (progressEvent) => {

            const percent =
              Math.round(

                (
                  progressEvent.loaded * 100
                ) /

                progressEvent.total
              )

            if (
              onUploadProgress
            ) {

              onUploadProgress(
                percent
              )
            }
          },
      }
    )

  return response.data
}