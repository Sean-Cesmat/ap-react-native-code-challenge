const initialState = {
  albums: [],
	selectedAlbumId: 1,
	selectedAlbumTitle: '',
	pictureOpen: false,
	pictureImgUrl: '',
	pictureImgTitle: '',
	pictureId: ''
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Lift_Albums_To_State':
            return {
                ...state,
                albums: action.payload,
            };
				case 'Selected_Album':
            return {
                ...state,
                selectedAlbumId: action.payload.id,
								selectedAlbumTitle: action.payload.title
            };
				case 'Open_Picture':
            return {
                ...state,
                pictureOpen: true,
								pictureImgUrl: action.payload.url,
								pictureImgTitle: action.payload.title,
								pictureId: action.payload.id
            };
		    default:
            return state;
    }
}

export default rootReducer;
