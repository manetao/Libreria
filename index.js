const connectButton = document.getElementById("connect-button");
const viewNFTsButton = document.getElementById("view-nfts");
const disconnectButton = document.getElementById("disconnect");
const uploadNFTButton = document.getElementById("upload-nft");

let isConnected = false; // Variable para seguir el estado de la conexión

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
        // Mostrar botones de Ver NFTs, Subir NFT y Desconectar
        viewNFTsButton.style.display = "inline-block";
        uploadNFTButton.style.display = "inline-block";
        disconnectButton.style.display = "inline-block";
        // Ocultar botón de Conectar
        connectButton.style.display = "none";
        isConnected = true; // Establecer el estado de conexión
        alert(`Conectado a MetaMask con la cuenta ${account}!`);
    } catch (error) {
        console.error(error);
        alert(`No se ha podido conectar`);
    }
});

// Event listener para el botón de Desconectar
disconnectButton.addEventListener("click", () => {
    // Restablecer el estado de la aplicación
    isConnected = false;
    // Mostrar el botón de Conectar nuevamente
    connectButton.style.display = "inline-block";
    // Ocultar los botones de Ver NFTs, Subir NFT y Desconectar
    viewNFTsButton.style.display = "none";
    uploadNFTButton.style.display = "none";
    disconnectButton.style.display = "none";
    alert("Desconectado de MetaMask");
});

uploadNFTButton.addEventListener("click", () => {
  if (isConnected) {
      const account = getCurrentAccount();
      if (account) {
          // Abre una nueva ventana (o pestaña) con la URL deseada y pasa el parámetro 'account'
          window.open(`subirNFT.html?account=${account}`, '_blank');
      } else {
          alert("No se pudo obtener la cuenta actual. Conéctate nuevamente a MetaMask.");
      }
  } else {
      alert("Debes estar conectado a MetaMask para subir un NFT.");
  }
});

function getCurrentAccount() {
  return window.ethereum.selectedAddress || null;
}


// Event listener para el botón de Ver NFTs (puedes implementar la funcionalidad deseada)
viewNFTsButton.addEventListener("click", () => {
    if (isConnected) {
        alert("Funcionalidad de Ver NFTs");
    } else {
        alert("Debes estar conectado a MetaMask para ver NFTs");
    }
});
