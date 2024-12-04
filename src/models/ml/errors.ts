export class MLError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MLError';
  }
}

export class ModelNotTrainedError extends MLError {
  constructor() {
    super('Model has not been trained yet');
    this.name = 'ModelNotTrainedError';
  }
}

export class InvalidInputError extends MLError {
  constructor(message: string) {
    super(`Invalid input: ${message}`);
    this.name = 'InvalidInputError';
  }
}

export class TrainingError extends MLError {
  constructor(message: string) {
    super(`Training failed: ${message}`);
    this.name = 'TrainingError';
  }
}

export class PredictionError extends MLError {
  constructor(message: string) {
    super(`Prediction failed: ${message}`);
    this.name = 'PredictionError';
  }
}