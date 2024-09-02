class ColorSpotGame {
    private levels: number;
    private stagesPerLevel: number;
    private currentLevel: number;
    private currentStage: number;

    constructor(levels: number, stages: number) {
        this.levels = levels;
        this.stagesPerLevel = stages;
        this.currentLevel = 1;
        this.currentStage = 1;
    }

    getGameNextLevel(): { dots: string[], resultIdx: number[] } {
        const level = this.currentLevel;
        const gridSize = this.calculateGridSize(level);
        const dots = Array(gridSize).fill("gray");
        const randomIndex : number[] = [];
        while (randomIndex.length < gridSize ) {
            const randomNum = Math.floor(Math.random() * (gridSize )) + 1;
            if (!randomIndex.includes(randomNum)) {
                randomIndex.push(randomNum);
            }
        }
        console.log(randomIndex,gridSize)
        return {
           dots: dots,
           resultIdx: randomIndex
        };
    }

    nextStage() {
        // TO DO:
        if (this.currentStage < this.stagesPerLevel) {
            this.currentStage++;
            return true;
        } else {
            return this.nextLevel();
        }
        
    }

    getScore(time: number): number {
        const BASE_SCORE = 100; // Base score for completing a stage
        const LEVEL_WEIGHT = 50; // Weight for each level
        const STAGE_WEIGHT = 20; // Weight for each stage
        const score = (BASE_SCORE
            + (this.currentLevel * LEVEL_WEIGHT)
            + (this.currentStage * STAGE_WEIGHT)
);

        if(this.currentLevel === 1 && this.currentStage === 1){
            return 0
        }else{
            return Math.max(Math.round(score), 0);
        }
    }

    getCurrentLevel() {
        // TO DO:
        // return current level
        return this.currentLevel  
    }

    getCurrentStage() {
        // TO DO:
        // current stage
        return this.currentStage
    }

    private nextLevel() {
    // TO DO:
    if (this.currentLevel < this.levels) {
        this.currentLevel++;
        this.currentStage = 1;
        return true;

    }else{ 
        console.log("Game Clear")
        return false;
    }
    }


    

    private calculateGridSize(level: number): number {
        level = level + 1;
        return level * level;
    }
}

export default ColorSpotGame;