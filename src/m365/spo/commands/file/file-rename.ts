import { Logger } from '../../../../cli';
import {
  CommandOption
} from '../../../../Command';
import GlobalOptions from '../../../../GlobalOptions';
import request from '../../../../request';
import SpoCommand from '../../../base/SpoCommand';
import commands from '../../commands';

interface CommandArgs {
  options: Options;
}

interface Options extends GlobalOptions {
  webUrl: string;
  sourceUrl: string;
  targetFilename: string;
  force?: boolean;
}

class SpoFileRenameCommand extends SpoCommand {
  public get name(): string {
    return commands.FILE_RENAME;
  }

  public get description(): string {
    return 'Renames a file';
  }

  public getTelemetryProperties(args: CommandArgs): any {
    const telemetryProps: any = super.getTelemetryProperties(args);
    telemetryProps.force = args.options.force || false;
    return telemetryProps;
  }

  public commandAction(logger: Logger, args: CommandArgs, cb: () => void): void {
    const webUrl = args.options.webUrl;
    const parsedUrl: url.UrlWithStringQuery = url.parse(webUrl);
    const tenantUrl: string = `${parsedUrl.protocol}//${parsedUrl.hostname}`;

    // What error if source file doesn't exist
    // What error if source file is a folder
    // What if destination file already exists
    // What if destination file is a folder
    // What if extension is changed

    // Create rename job
    this
      .then((): Promise<void> => {

        const webServerRelativeUrl: string = webUrl.replace(tenantUrl, '');
        const fileServerRelativeUrl: string = `${webServerRelativeUrl}${args.options.sourceUrl}`;

        const requestUrl = `${webUrl}/_api/web/GetFileByServerRelativeUrl('${encodeURIComponent(fileServerRelativeUrl)}')/`;


        return request.post(requestOptions);

      }

    cb(); // notify that the command completed
  }

  public options(): CommandOption[] {
    const options: CommandOption[] = [
      {
        option: '-u, --webUrl <webUrl>'
      },
      {
        option: '-s, --sourceUrl <sourceUrl>'
      },
      {
        option: '-t, --targetFilename <targetFilename>'
      },
      {
        option: '--force'
      }
    ];

    const parentOptions: CommandOption[] = super.options();
    return options.concat(parentOptions);
  }
}

module.exports = new SpoFileRenameCommand();