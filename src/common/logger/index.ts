const Colors = {
  reset: '\u001b[0m',
  info: '\u001b[38;5;6m',
  warn: '\u001b[38;5;215m',
  error: '\u001b[38;5;167m'
};

export const logger = {
  info(message: unknown) {
    console.log(`${Colors.info}Info: ${message}${Colors.reset}`);
  },
  warn(message: unknown) {
    console.log(`${Colors.warn}Warn: ${message}${Colors.reset}`);
  },
  error(message: unknown) {
    console.log(`${Colors.error}Error: ${message}${Colors.reset}`);
  }
};
