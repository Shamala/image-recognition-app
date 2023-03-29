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
import { baseUrl } from "./config";
function App() {
  const imageRef = useRef();

  const [imageUrl, setImageUrl] = useState("");
  const [input, setInput] = useState("");
  const [regions, setRegions] = useState([]);
  const [route, setRoute] = useState("route");
  const [signedIn, setSignedIn] = useState(false);
  const [user, setUser] = useState({});

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await container;
  }, []);

  const setInitialState = () => {
    setImageUrl("");
    setInput("");
    setRegions([]);
    setSignedIn(false);
    setUser({});
  };

  const displayRegions = (response) => {
    if (response && response.outputs && response?.outputs[0].data.regions) {
      setRegions((prev) => [...response.outputs[0].data.regions]);
    }
  };
  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onRouteChange = (route) => {
    if (route === "signOut") {
      setInitialState();
    } else if (route === "home") {
      setSignedIn(true);
    }
    setRoute(() => route);
  };

  const onSubmit = () => {
    setImageUrl(() => input);
    fetch(`${baseUrl}/imageurl`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl: imageUrl,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response) {
          fetch(`${baseUrl}/image`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user?.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser((prev) => {
                const currentUser = { ...prev, entries: count };
                return currentUser;
              });
            })
            .catch(console.log);
        }
        displayRegions(response);
      });
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
          <Rank name={user?.name} entries={user?.entries} />
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
        <Register onRouteChange={onRouteChange} setUser={setUser} />
      ) : (
        <Signin onRouteChange={onRouteChange} setUser={setUser} />
      )}
    </div>
  );
}

export default App;
