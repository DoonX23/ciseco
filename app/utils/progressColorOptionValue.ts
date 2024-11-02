function progressColorOptionValue(optionValue: string): {
  text: string;
  value: string;
  isColor?: boolean;
  colorHexs?: string[];
  isImage?: boolean;
  imageUrl?: string;
} {
  // optionValue có thể có 1 trong các dạng sau
  // Red
  // Red <!-- #000 -->
  // Red cotton 100% <!-- http... imageURL -->
  // Red and blue <!-- #000/#00f -->

  //    sử dụng regex để tách ra 2 phần text và value bên trong dấu <!-- --> từ optionValue
  //    sau đó trả về 1 object có dạng sau
  //    {
  //        text: 'Red',
  //        value: [#000]
  //       isColor: boolean,
  //       colorHexs: string[]
  //       isImage: boolean
  //       imageUrl: string
  //    }
  //    nếu không tìm thấy dấu <!-- --> thì trả về object có dạng sau
  //    {
  //        text: 'Red',
  //        value: ''
  //    }

  const regex = /<!--\s*(.*)\s*-->/;
  const match = optionValue.match(regex);

  if (match) {
    const value = match[1].trim();
    // kiểm tra match có chứa #mã_màu hoặc #mã_màu_1/#mã_màu_2 hay không
    const isColor = value.match(/^#[0-9a-f]{3,6}(\/#[0-9a-f]{3,6})?$/);

    // kiểm tra match có chứa link ảnh hay không
    const isImage = value.match(/^http/);

    return {
      text: optionValue.replace(match[0], '').trim(),
      value,
      isColor: isColor ? true : false,
      colorHexs: isColor ? value.split('/') : undefined,
      isImage: isImage ? true : false,
      imageUrl: isImage ? value : undefined,
    };
  } else {
    return {
      text: optionValue,
      value: '',
    };
  }
}

export default progressColorOptionValue;
