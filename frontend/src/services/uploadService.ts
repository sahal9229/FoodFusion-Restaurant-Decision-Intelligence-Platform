/**
 * Upload Service
 * 
 * Handles the upload flow by sending the file as FormData directly to the Cloud Function.
 */

const UPLOAD_FUNCTION_URL = import.meta.env.VITE_UPLOAD_FUNCTION_URL;

/**
 * Upload the file directly to the Cloud Function using FormData and XMLHttpRequest
 * (for progress tracking).
 */
export function uploadFile(
  file: File,
  onProgress: (percent: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!UPLOAD_FUNCTION_URL) {
      reject(new Error("Upload function URL is not configured. Set VITE_UPLOAD_FUNCTION_URL in .env"));
      return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);

    // Track upload progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    });

    // Handle completion
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress(100);
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
      }
    });

    // Handle network errors
    xhr.addEventListener("error", () => {
      reject(new Error("Network error during file upload. Please check your connection."));
    });

    // Handle abort
    xhr.addEventListener("abort", () => {
      reject(new Error("Upload was cancelled."));
    });

    // Send the file via POST as FormData to the Cloud Function
    xhr.open("POST", UPLOAD_FUNCTION_URL);
    xhr.send(formData);
  });
}

