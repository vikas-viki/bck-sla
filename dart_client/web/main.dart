import 'package:web/web.dart' as web;
import 'dart:js' as js;
import 'package:http/http.dart' as http;
import 'dart:convert'; // For jsonDecode

void selectPort() {
  js.context.callMethod('selectPort');
}

void selectFiles() {
  js.context.callMethod('selectFiles');
}

void runScript() async {
  js.context.callMethod('runScript');

  for (int i = 0; i <= 1000; i++) {
    Future.delayed(Duration(milliseconds: i * 100), () async {
      double percent = await fetchStatus();
      web.document.querySelector(".progress-label")?.firstChild?.text =
          "Operation progress " + percent.toString() + "%";

      updateProgress(percent);
    });
  }
}

Future<double> fetchStatus() async {
  final url = 'http://localhost:3000/get-status';
  double percent = 0.00;

  try {
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      percent = double.parse(data['percent']);
    } else {
      print('Failed to load data');
    }
  } catch (e) {
    print('Error: $e');
  }
  return percent;
}

void updateProgress(double percentage) async {
  final progressBar =
      web.document.querySelector('#progress-bar') as web.HTMLProgressElement;
  progressBar.value = percentage;
}

void main() {
  final element = web.document.querySelector('#output') as web.HTMLDivElement;

  final selectPortButton = web.HTMLButtonElement();
  selectPortButton.text = 'Select Port';
  selectPortButton.className = 'button';
  selectPortButton.onClick.listen((event) => selectPort());

  final selectFilesButton = web.HTMLButtonElement();
  selectFilesButton.text = 'Select Files';
  selectFilesButton.className = 'button';
  selectFilesButton.onClick.listen((event) => selectFiles());

  final runScriptButton = web.HTMLButtonElement();
  runScriptButton.text = 'Run Script';
  runScriptButton.className = 'button';
  runScriptButton.onClick.listen((event) => runScript());

  final progressContainer = web.HTMLDivElement();
  progressContainer.id = 'progress-container';

  final progressLabel = web.HTMLSpanElement();
  progressLabel.className = 'progress-label';
  progressLabel.text = "Operation Progress";

  final progressBar = web.HTMLProgressElement();
  progressBar.id = 'progress-bar';
  progressBar.max = 100;
  progressBar.value = 0;

  progressContainer.append(progressLabel);
  progressContainer.append(progressBar);

  element.append(selectPortButton);
  element.append(selectFilesButton);
  element.append(runScriptButton);
  element.append(progressContainer);
}
