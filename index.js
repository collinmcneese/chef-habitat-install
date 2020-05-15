const core = require('@actions/core');
const exec = require('@actions/exec');
const os = require('os');

async function main() {
  try {
    const version = core.getInput('version');
    const installURL = 'https://raw.githubusercontent.com/habitat-sh/habitat/master/components/hab/install.sh';
    if (os.platform() !== 'win32') {
      if (version) {
        var versionParam = `-v ${version}`;
      } else {
        versionParam = '';
      }
      console.log('Downloading Chef Habitat Installation script from:');
      console.log(installURL);
      await exec.exec(`curl -o habitat-install.sh ${installURL}`);
      await exec.exec(`sudo bash habitat-install.sh ${versionParam}`);
      await exec.exec('rm -f habitat-install.sh');
    } else {
      const windowsPath = core.getInput('windowsPath');
      const installURL = 'https://raw.githubusercontent.com/habitat-sh/habitat/master/components/hab/install.ps1';
      if (version) {
        versionParam = `-v ${version}`;
      } else {
        versionParam = '';
      }
      await exec.exec('powershell.exe -command ". { Set-ExecutionPolicy Bypass -Scope Process -Force }"');
      await exec.exec(`powershell.exe -command ". { iwr -outfile habitat-install.ps1 ${installURL} }"`);
      await exec.exec(`powershell.exe -command ". { ./install.ps1 ${versionParam}"`);
      await exec.exec('powershell.exe -command ". { remove-item -force habitat-install.ps1"');
      core.addPath(`${windowsPath}\\bin`);
    }
  } catch (error){
    core.setFailed(error.message);
  }
}
main();
