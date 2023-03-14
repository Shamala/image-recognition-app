import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/ImageRecognition/ImageRecognition.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useState, useRef } from "react";

function App() {
  const imageRef = useRef();
  const PAT = "9c190be0d5734c2ab57c4963fee46c38";
  const USER_ID = "shamala_mallya";
  const APP_ID = "face-recognition";
  const MODEL_ID = "general-image-detection";

  const [imageUrl, setImageUrl] = useState("");
  const [input, setInput] = useState("");
  const [regions, setRegions] = useState([]);
  const [route, setRoute] = useState("route");
  const [signedIn, setSignedIn] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const getClarifaiRequestOptions = (imageUrl) => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl,
            },
          },
        },
      ],
    });

    return {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
  };

  const onInputChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const onRouteChange = (route) => {
    if (route === "signOut") setSignedIn(false);
    else if (route === "home") setSignedIn(true);
    setRoute(() => route);
  };

  const onSubmit = () => {
    setImageUrl(() => input);
    console.log("Click");
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      getClarifaiRequestOptions(imageUrl)
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        console.log(result.outputs[0].data.regions);
        setRegions((prev) => [...result.outputs[0].data.regions]);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <Particles
        className="background"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      {route === "home" ? (
        <>
          <Navigation onRouteChange={onRouteChange} signedIn={signedIn} />
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            input={input}
            onSubmit={onSubmit}
          />
          <FaceRecognition
            imageUrl={imageUrl}
            imageRef={imageRef}
            regions={regions}
          />
        </>
      ) : route === "register" ? (
        <Register onRouteChange={onRouteChange} />
      ) : (
        <Signin onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
