const connectButton = document.getElementById("connect-button");

      connectButton.addEventListener("click", async () => {
        if (!window.ethereum) {
          window.location.href = "https://metamask.io/download.html";
          return;
        }
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          const account = accounts[0];
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x61" }]
          });
          alert(`Connected to MetaMask with account ${account}!`);
        } catch (error) {
          console.error(error);
          alert(`No se ha podido conectar`);
        }
      });