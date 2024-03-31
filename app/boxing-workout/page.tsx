"use client";
import React from "react";

import WorkoutConfigurator from "./components/workout-configurator/workout-configurator";
import WorkoutSetup from "./components/workout-setup/workout-setup";
import Rest from "./components/rest/rest";
import PunchRushRound from "./components/punch-rush/punch-rush";
import RoundComplete from "./components/round-complete/round-complete";
//import WorkoutComplete from "./components/workout-complete/workout-complete"; // Import your new component

export default function BoxingWorkoutPage() {
  const [workoutStage, setWorkoutStage] = React.useState(1);
  const [numRounds, setNumRounds] = React.useState(0);
  const [totalStrikes, setTotalStrikes] = React.useState(0);

  // Function to move to the next stage/round
  const handleNextStep = () => {
    setWorkoutStage((prevStage) => prevStage + 1);
  };

  const handleSetComplete = () => {
    setWorkoutStage(numRounds * 2 + 3); // Proceed to the final completion stage after all rounds are done
  }

  const handleRoundComplete = () => {
    handleNextStep();
  }

  React.useEffect(() => {
    console.log("Workout Stage: ", workoutStage);
    console.log("Number of Rounds: ", numRounds);
  }, [workoutStage, numRounds]);

  return (
    <div className="max-w-8xl h-full w-full px-2 lg:px-24 font-nfultra">
      {workoutStage === 1 && (
        <WorkoutConfigurator
          onConfigure={({ rounds }) => {
            setNumRounds(rounds);
            handleNextStep();
          }}
          setNumRounds={setNumRounds}
        />
      )}

      {workoutStage > 1 && workoutStage <= numRounds * 3 + 1 && (
        workoutStage % 3 === 2 ? ( // WorkoutSetup stages (2, 5, 8, ...)
          <WorkoutSetup
            roundNumber={Math.floor((workoutStage - 2) / 3) + 1}
            onRoundComplete={handleNextStep}
            setTotalStrikes={setTotalStrikes}
            totalStrikes={totalStrikes}
          />
        ) : workoutStage % 3 === 0 ? ( // Rest stages (3, 6, 9, ...)
          <Rest
            roundCompleted={Math.floor((workoutStage - 3) / 3)}
            workoutCompleted={handleNextStep}
          />
        ) : ( // PunchRushRound stages (4, 7, 10, ...)
          <PunchRushRound
            roundNumber={Math.floor((workoutStage - 4) / 3) + 1}
            onRoundComplete={handleNextStep}
            setTotalStrikes={setTotalStrikes}
            totalStrikes={totalStrikes}
          />
        )
      )}

      {workoutStage === 6 && ( // Adjusted for the additional PunchRushRound stage
        <RoundComplete
          roundCompleted={handleRoundComplete}
          workoutCompleted={() => window.location.href = "/"}
        />
      )}

      
    </div>
  );
}