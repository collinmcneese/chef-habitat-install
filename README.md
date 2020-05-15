# chef-habitat-install

[![CI State](https://github.com/collinmcneese/chef-habitat-install/workflows/release/badge.svg)](https://github.com/collinmcneese/chef-habitat-install)

Install Chef Habitat for pipeline usage

> logic for action modified from upstream action [https://github.com/actionshub/chef-install]

## Usage

Works with Windows and Linux (kernel 3+)

```yaml
name: delivery

on: [push, pull_request]

jobs:
  jobname:

    runs-on: ubuntu-latest

    steps:
    - name: Check out code
      uses: actions/checkout@master
    - name: install chef
      uses: collinmcneese/chef-habitat-install@master

  jobname2:

    runs-on: windows-latest

    steps:
    - name: Check out code
      uses: actions/checkout@master
    - name: install chef
      uses: collinmcneese/chef-habitat-install@master
 ```

## Envrionment Variables

|name| default| description|
|--- |------- |----------- |
|version | latest | version to install |
