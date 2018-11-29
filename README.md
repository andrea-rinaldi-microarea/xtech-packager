# xtech-packager
Allow you to pack in a zip file one or some XTech profiles, even when spanned over multiple modules and applications.

## Installation

Clone or download, then
```
npm install
```
To use from the command line:
```
npm link
```
This is mandatory as you will need to invoke the command from a folder inside the Standard or Custom TB subfolder structure.

## Usage
From any path, invoke as:
```
xtech-packager
-- or --
xpack
```
To pack standard profiles you will be required to change your current folder to a standard TB application path:
```
<your instance>\Standard\Applications\<your app>
(i.e.: C:\development\Standard\Applications\AwesomeApp)
```
To pack custom profile you will be required to change your current folder to a company custom folder:
```
<your instance>\Custom\Companies\<your company>\Applications\<your app>
(i.e.: C:\development\Custom\Companies\LuxuryRags\Applications\AwesomeApp)
```
