import 'package:web/web.dart' as web;
import 'dart:js' as js;

void selectPort() {
  js.context.callMethod('selectPort');
}

void selectFiles() {
  js.context.callMethod('selectFiles');
}

void runScript() {
  js.context.callMethod('runScript');
}
void main() {
  final now = DateTime.now();
  final element = web.document.querySelector('#output') as web.HTMLDivElement;
  element.text = 'The time is ${now.hour}:${now.minute} '
      'and your Dart web app is running!';

  final selectPortButton = web.HTMLButtonElement();
  selectPortButton.text = 'Select Port';
  selectPortButton.onClick.listen((event) => selectPort());

  final selectFilesButton = web.HTMLButtonElement();
  selectFilesButton.text = 'Select Files';
  selectFilesButton.onClick.listen((event) => selectFiles());

  final runScriptButton = web.HTMLButtonElement();
  runScriptButton.text = 'Run Script';
  runScriptButton.onClick.listen((event) => runScript());

  element.append(selectPortButton);
  element.append(selectFilesButton);
  element.append(runScriptButton);
}
