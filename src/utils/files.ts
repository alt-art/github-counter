import { HttpException, HttpStatus } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

function getTemplateSvg(filename = 'default.svg'): Promise<string> {
  try {
    return readFile(join(__dirname, '..', 'templates', filename), 'utf8');
  } catch (error) {
    throw new HttpException(
      'Could not find template file',
      HttpStatus.BAD_REQUEST,
    );
  }
}

export { getTemplateSvg };
