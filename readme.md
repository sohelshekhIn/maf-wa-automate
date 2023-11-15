# MAF - WhatsApp Image Upload Automation

Automate the process of uploading images on WhatsApp using this script. Simplify the image upload workflow, extract essential information from captions, and seamlessly integrate with your backend for efficient data entry. Empower your WhatsApp interactions with streamlined image processing.

## Features
- Simplifies image upload process on WhatsApp
- Extracts information from image captions for data entry
- Seamless integration with backend for efficient data handling
- Enhance your workflow and save time on repetitive tasks


## Installation

```bash
# Install dependencies
pnpm install
```


# Getting Started

Before you can start using the WhatsApp Image Upload Automation, follow these steps:

1. Create a `.env` file in the root of your project.

2. Open the `.env` file in a text editor and add the following variables:

   ```env
   TARGET_WA_MOBILE= # Add your target WhatsApp mobile number (including international code)
   DATA_ENTRY_API= # Add the URL of your Flask Data Entry API endpoint
   ```

```bash
pnpm start
```
After you run the start command, follow these steps to link your device using WhatsApp Web (if running for the first time) or if the directory doesn't contains the ```tokens``` folder:

1. Open WhatsApp on your mobile device.

2. Navigate to the chat list and tap on the three dots in the top-right corner.

3. Select "Linked Devices" from the menu.

4. Choose "Link a device."

5. Scan the QR code displayed on your terminal or screen using your WhatsApp app.

6. Once scanned, your device will be linked, and you can start using the automation script.


# Tests
```bash
pnpm test
```

