---
title: "HAOS"
phase: "Phase 5"
weight: 5
---

> **Prerequisite:** [Proxmox](/blueprint/03-proxmox)

**Home Assistant OS** (HAOS) is a dedicated operating system designed to run <a href="https://www.home-assistant.io/" target="_blank" rel="noopener">Home Assistant</a>, which is a privacy-focused, all-in-one solution that allows you set up and manage your smart home devices like lights, sensors and smart plugs without the need for subscriptions or cloud connections.

This page covers setting up HAOS as a virtual machine (VM) on Proxmox.

---

## Create the HAOS VM

HAOS does not use an installer ISO like other operating systems. Instead, you normally download a pre-built disk image that you either write directly to the target boot disk, or alternatively, import into a VM in our case.

Because of this, the easiest way to set up HAOS on Proxmox is to use the <a href="https://community-scripts.github.io/ProxmoxVE/scripts?id=haos-vm" target="_blank" rel="noopener">Home Assistant OS Helper Script</a>. This script automatically creates a VM with 2 vCPUs & 4GB RAM, downloads and imports the HAOS disk image, and configures the necessary settings for you automatically.

To do this, navigate to your Proxmox server's web UI, click on your server node, then go to the **Shell** tab, then paste and run the command below to execute the script:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/community-scripts/ProxmoxVE/main/vm/haos-vm.sh)"
```

- You will first see a prompt asking you to confirm the creation of a new VM. Ensure `Yes` is selected, then press `Enter` to proceed.
- The next prompt will ask if you want to use default settings. Again, ensure `Yes` is selected, then press `Enter`.
- The next prompt will ask if you want to keep the downloaded HAOS image after the installation is complete. Use the arrow keys to highlight `No` and then press `Enter`.

Once the script completes, you will see the new HAOS VM listed under your server node in the Proxmox web UI. This VM should already be running and will be already configured to start automatically. 

Select the new VM from the list, click on the **Console** tab, and you should see the HAOS boot screen, which should show the IP address assigned to the VM once it has completed booting up.

You can now access Home Assistant by navigating to `http://<ip-address>:8123` in your web browser, where `<ip-address>` is the IP address shown on the VM's boot screen.

---

## Set Up and Configure Home Assistant

After navigating to the Home Assistant web UI, select **Create My Smart Home**. You will be prompted to create a new user account for accessing the Home Assistant dashboard. Follow the on-screen instructions to complete the initial setup.

### Set Static IP Address

After completing the initial setup, my first recommendation is to give your Home Assistant instance a static IP address to ensure it remains reachable at the same address over time.

To do this, navigate to **Settings** > **System** > **Network** in the Home Assistant web UI. Under **Configure Network Interfaces**, click on **IPv4** and select **Static**. Change the address in the **IP Address** field to your desired static IP address, then click **Save**.

---

## Using Home Assistant

> **Home Assistant** has a ton of functionality, more than we can get into here. **<a href="https://www.youtube.com/@SmartHomeSolver/videos" target="_blank" rel="noopener">Smart Home Solver</a>** has a great beginner's guide video below that will help you hit the ground running:<br><br> {{< youtube Z4gvkmJ8q48 >}}<br>

---

## Set Up Automatic Backups

After you get Home Assistant set up the way you want it, my next recommendation is to set up automatic backups for your Home Assistant instance to ensure you can restore your configuration in case of any issues later down the road.

To do this, navigate to **Settings** > **System** > **Backups** in the Home Assistant web UI. Click on **Set Up Backups**. You will be shown an encryption key, **make sure to save this somewhere safe!** Go ahead and also download the **emergency kit** file and save it somewhere safe as well, then click **Next**. 

On the next screen, choose **Recommended** for the backup type.

You now have daily automatic backups scheduled, but these are stored locally within the HAOS VM itself. You can download a copy of one of your backups by navigating to **Settings** > **System** > **Backups**, then under **My Backups**, click on **Show All Backups**, then click the `⋮` button on the latest backup job and choose **Download**. This will download the backup file to your computer so you can store it somewhere safe.

However, we can take this a step further if you previously set up a TrueNAS VM.

### Store Backups on TrueNAS

To do this, navigate to **Settings** > **System** > **Storage** in the Home Assistant web UI. Under **Network Storage**, click on **Add Network Storage**:
- Give a name to the storage config (for example: `TrueNAS`).
- For **Usage**, choose **Backup**.
- In the **Server** field, enter the static IP address of your TrueNAS VM you configured earlier.
- For **Protocol**, choose **Samba/Windows (CIFS)**.
- For **Share**, enter the name of the SMB share you created earlier in TrueNAS. You can confirm this by navigating to **Shares** > **Windows (SMB) Shares** in the TrueNAS web UI and checking the `Name` field of the share you created.
  - Entering just the name of the share will result in Home Assistant saving the backup files to the root level of the share. If you want to save the backups to a specific folder within the share, you can append the path after the share name (for example: `<share-name>/Backups/HomeAssistant`).
- Enter the username and password of the user you created earlier in TrueNAS for accessing the SMB share.
- Click **Connect**.
- Next, navigate to **Settings** > **System** > **Backups** in the Home Assistant web UI.
- Under **Backup Settings**, click on **Local backup only** to open the **Locations** config for your backup settings.
- Here, you should see both options: **This System** and **TrueNAS** (or whatever you named your network storage config).
- Click the slider next to your network storage config to enable it, then optionally disable **This System** so that the backup files are only stored on your TrueNAS storage.
- Test this out by navigating to **Settings** > **System** > **Backups**, then in the lower-right corner, click on **Backup Now**, then select **Automatic Backup**.
- After the backup job completes, navigate to your TrueNAS SMB share to confirm that the backup file has been saved there successfully.

---

## Next Steps

---

> **Last updated:** January 2026<br>