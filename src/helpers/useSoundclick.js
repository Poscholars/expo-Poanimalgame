import { useEffect, useRef, useState } from "react";
import Sound from "react-native-sound";

export default () => {
  const sound = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    sound.current = new Sound("./btnclick.mp3", "", (error) => {
      if (error) {
        console.log("Error loading sound:", error);
        return;
      }
      setIsLoaded(true);
    });

    return () => {
      sound.current?.release();
    };
  }, []);

  const play = () => {
    if (sound.current && isLoaded) {
      sound.current.play((success) => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const stop = () => {
    if (sound.current) {
      sound.current.stop();
      setIsPlaying(false);
    }
  };

  return { play, stop, isLoaded, isPlaying };
};