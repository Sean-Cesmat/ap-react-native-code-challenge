export const liftAlbumsToState = (albums) => {
	return {
		type: "Lift_Albums_To_State",
		payload: albums
	};
}

export const selectedAlbum = (album) => {
	return {
		type: "Selected_Album",
		payload: album
	};
}

export const openPicture = (pictureData) => {
	return {
		type: "Open_Picture",
		payload: pictureData
	};
}
