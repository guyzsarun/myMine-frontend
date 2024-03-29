import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { LoginPopup } from "./LoginPopup";
import {
  subscribeToTimer,
  playerNumber,
  updatePlayer,
  onUsername,
  onScore,
  onResetBoard,
  emitCountDown,
  onCountDown,
  onPlayable,
  onWinner,
  emitResetBoard,
  onHighscore,
  emitSurrender
} from "../api";
import { Board } from "./Board";
import { Chat } from "./Chat";
import "../css/App.css";
import { Score } from "./Score";
import { CreditPopup } from "./CreditPopup";

export interface User {
  userName: string;
  score: number;
}

const App: React.FC = () => {
  const [timestamp, setTimestamp] = useState("no time stamp yet");
  const [countdown, setCountdown] = useState(0);
  const [playNo, setPlayerNo] = useState(0);
  const [playerName, setPlayerName] = useState("null");
  const [isLogin, setLogin] = useState(false);
  const [isPlayer, setPlayerStatus] = useState(false);
  const [isPlayable, setPlayable] = useState("-");
  const [scores, setScores] = useState<User[]>([]);
  const [winner, setWinner] = useState("");
  const [notReady, setNotReady] = useState(true);
  const [welcome, setWelcome] = useState(true);
  const [highscore, setHighscore] = useState<User>(null);
  const [skin, setSkin] = useState(1)

  useEffect(() => {
    onUsername((err: any, name: Array<any>) => {
      setPlayerName(name[0]);
      setLogin(name[1]);
      setPlayerStatus(name[2]);
    });
    subscribeToTimer((err: any, interval: string) => setTimestamp(interval));
    updatePlayer();
    playerNumber((err: any, playerNumber: number) => setPlayerNo(playerNumber));
    onScore((err: any, score: User[]) => setScores(score));
    onPlayable((err: any, playable: string) => {
      console.log(playable);
      setWelcome(false);
      setPlayable(playable);
    });
    onCountDown((err: any, count: number) => {
      setCountdown(count);
    });
    onWinner((err: any, winner: string) => {
      setWinner(winner);
      setPlayable("-");
    });
    onHighscore((err: any, winner: User) => {
      setHighscore(winner);
      console.log(winner.userName + ": " + winner.score);
    });
    onResetBoard((err: any, round: number) => {
      setNotReady(true);
      setPlayable("-");
    });
  }, [setTimestamp, setCountdown, setPlayable]);

  const clickReady = () => {
    if (notReady) {
      emitCountDown(playerName, winner);
      setNotReady(false);
    }
  };

  const clickSurrender = () => {
    if (isPlayable !== "-") {
      emitSurrender(playerName);
    }
  };

  const clickOne = () => {
    setSkin(1)
  }
  const clickTwo = () => {
    setSkin(2)
  }
  const clickThree = () => {
    setSkin(3)
  }

  const toggleReady = () => {
    return !notReady ? (
      <div>
        <button className="Start-button" onClick={clickReady}>
          Ready &#x1f44d;
        </button>
      </div>
    ) : (
      <div>
        <button className="Start-button" onClick={clickReady}>
          Ready
        </button>
      </div>
    );
  };

  const toggleReset = () => {
    return isPlayable === "-" ? (
      <div>
        <button className="Start-button" onClick={resetBoard}>
          Reset
        </button>
        <button style={{ padding: "12px 50px 11px" }} onClick={clickSurrender}>
          Surrender
        </button>
      </div>
    ) : (
      <div>
        <button className="Start-button" onClick={resetBoard}>
          Reset &#x1f6d1;
        </button>
        <button className="surrenderButton" onClick={clickSurrender}>Surrender</button>
      </div>
    );
  };

  const resetBoard = () => {
    if (isPlayable === "-") emitResetBoard();
    else alert("You are currently playing!");
  };

  return (
    <div className="App">
      <div className="App-body">
        <div className="App-game">
          <header className="Game-header">
            <div className="Game-Title">
              <h1 style={{ margin: "auto" }}>
                &#x1F4A3; Find My Mines &#x1F4A3;
              </h1>
            </div>
            <div className="Game-username" style={{ fontWeight: 800 }}>
              {isLogin ? (
                "Nickname  : " +
                playerName +
                (isPlayer ? "" : " (spectator)") +
                "   |   Highscore  : " +
                (highscore !== null
                  ? highscore.userName + " - " + highscore.score
                  : "-")
              ) : (
                <LoginPopup />
              )}
            </div>

            <hr />
          </header>
          {isLogin ? (
            welcome ? (
              <h3>Welcome {playerName}!</h3>
            ) : (
              <h2>Timer: {countdown}</h2>
            )
          ) : (
            <p></p>
          )}
          {isLogin && winner !== "" ? (
            <h2>The winner is: {winner}</h2>
          ) : (
            <p></p>
          )}
          {isLogin ? <Score scores={scores} /> : <p></p>}
          {isLogin ? (
            <h3 style={{ background: "lightgrey" }}>
              Current turn: {isPlayable}
            </h3>
          ) : (
            <p></p>
          )}
          {isLogin ? (
            <Board name={playerName} status={playerName === isPlayable} skin={skin} />
          ) : (
            <h2>Please Login First</h2>
          )}

          {isPlayer ? toggleReady() : ""}
          {isPlayer ? toggleReset() : ""}
          <div className="share">
            <div
              className="fb-share-button"
              data-href="http://find-my-mine.herokuapp.com/"
              data-layout="button_count"
              data-size="large"
              style={{ width: "20%" }}
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ffind-my-mine.herokuapp.com%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore"
              >
                Share
              </a>
            </div>
            <div style={{ width: "20%", marginTop: "20px", display: "flex", justifyContent: "center" }}>
              <CreditPopup />
              <Popup trigger={<button className="skinButton">Select skin</button>} position="top center">
                <div className="Buttons">
                  <button onClick={clickOne}>Skin 1</button>
                  <button onClick={clickTwo}>Skin 2</button>
                  <button onClick={clickThree}>Skin 3</button>
                </div>
              </Popup>
            </div>

            <p style={{ width: "60%", paddingTop: "20px" }}>{timestamp}</p>
          </div>
        </div>
        }
        <div className="App-chat">
          <header className="Chat-header">
            <h2 style={{ color: "black" }}>
              Online Player: {isLogin ? playNo : 0}
            </h2>
          </header>
          {isLogin ? (
            <Chat name={playerName} status={isPlayer} />
          ) : (
            <h2>Please Login First</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
