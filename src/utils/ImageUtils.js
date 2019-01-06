import * as ImagePick from 'react-native-image-picker';
import ImagePicker  from 'react-native-image-crop-picker';


export const pickImageHandler = () => {
    return new Promise((resolve, reject) => {
        ImagePick.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
        if (res.didCancel) {
            // console.log("User cancelled!");
        } else if (res.error) {
            // console.log("Error", res.error);
        } else {
            console.log(res);
            ImagePicker.openCropper({
                path: res.uri.toString(),
                width: 50,
                height: 50,
                freeStyleCropEnabled: true,
                cropping: true
            }).then(image => {
                console.log("hasil cropper ", image);
                var obj ={
                    imgCrop : image,
                    originalImg: res.uri
                }
                resolve(obj);
             
            }).catch((err)=>{
                reject(err);
            });
        }
        });
    })
}
