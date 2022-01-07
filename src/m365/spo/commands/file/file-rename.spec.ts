import * as assert from 'assert';
import * as fs from 'fs';
import * as sinon from 'sinon';
import appInsights from '../../../../appInsights';
import auth from '../../../../Auth';
import { Logger } from '../../../../cli';
import Command, { CommandError } from '../../../../Command';
import request from '../../../../request';
import Utils from '../../../../Utils';
import commands from '../../commands';
import { FolderExtensions } from '../../FolderExtensions';
const command: Command = require('./file-add');

describe(commands.FILE_RENAME, () => {
  let log: any[];
  let logger: Logger;
  let loggerLogSpy: sinon.SinonSpy;
  
  it('has correct name', () => {
    assert.strictEqual(command.name, commands.FILE_ADD);
  });

  it('allows unknown options', () => {
    const actual = command.allowUnknownOptions();
    assert.strictEqual(actual, true);
  });

  it('has a description', () => {
    assert.notStrictEqual(command.description, null);
  });
});