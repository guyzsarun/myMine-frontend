import React, { useState, useEffect } from "react";
import { chooseBox, onResetBoard, onBox, scoreUpdate, getScore } from "../api";

interface TheBox {
  pos: number;
  user: string;
  pStatus: boolean;
  skin: number;
}

export const Box: React.FC<TheBox> = ({ pos = 69, user, pStatus, skin }) => {
  const [pic, setPic] = useState(process.env.PUBLIC_URL + "image/unClick");

  useEffect(() => {
    onResetBoard(() => {
      setPic(process.env.PUBLIC_URL + "image/unClick");
    });
    onBox((err: any, res: Array<any>) => {
      if (res && pos === res[0]) {
        console.log(skin)
        const resPic = res[1]
          ? selectSkin()
          : process.env.PUBLIC_URL + "image/tiles";

        if (res[1] && user === res[2]) {
          scoreUpdate(res[2]);
          getScore();
        }
        setPic(resPic);
      }
    });
  }, [setPic,pos,user]);

  const togglePic = () => {
    if(pStatus && pic===process.env.PUBLIC_URL + "image/unClick"){
      chooseBox(pos, user);
    }
  };

  const selectSkin = () => {
    switch(skin) {
      case 1: return process.env.PUBLIC_URL + "image/bombgif";  
      case 2: return process.env.PUBLIC_URL + "image/bombgif2";
      case 3: return process.env.PUBLIC_URL + "image/bombgif3";
    }
  }

  return <img src={pic} onClick={togglePic} alt="Tiles" />;
};
