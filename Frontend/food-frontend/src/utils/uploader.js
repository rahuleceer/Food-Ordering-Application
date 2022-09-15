import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const uploader = (file, setUploader, setUrl) => {
  console.log('UPLOADER is running');
  try {
    const fileRef = ref(storage, `/DP/${file.name}`);

    const uploader = uploadBytesResumable(fileRef, file);

    uploader.on(
      'state_changed',
      (snap) => {
        const percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        setUploader(percentage);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        console.log('File uploaded successfully');
        const url = await getDownloadURL(fileRef);

        setUrl(url);
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export default uploader;
