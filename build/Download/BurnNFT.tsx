import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { decodeAddress, encodeAddress, getProgramMetadata } from "@gear-js/api";
import { Button } from "@gear-js/ui";

function BurnNFT() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();

  // Add your programID
  const programIDNFT =
    "0x1796c7f0c10c0cfa685137e1ae582cec80babaede8f31b4620d0e1c2b47b472f";

   // Add your metadata.txt
  const meta =
    "010000000000010c0000000114000000000000000001190000008d28a00008186e66745f696f1c496e69744e465400001001106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120626173655f757269040118537472696e67000124726f79616c746965730801444f7074696f6e3c526f79616c746965733e00000400000502000804184f7074696f6e040454010c0108104e6f6e6500000010536f6d6504000c00000100000c1020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e24726f79616c7469657324526f79616c7469657300000801206163636f756e74731001185061796f757400011c70657263656e742c010c753136000010042042547265654d617008044b011404560120000400240000001410106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004001801205b75383b2033325d000018000003200000001c001c000005030020000005070024000002280028000004081420002c00000504003008186e66745f696f244e4654416374696f6e000128104d696e740801387472616e73616374696f6e5f696434010c753634000138746f6b656e5f6d65746164617461380134546f6b656e4d65746164617461000000104275726e0801387472616e73616374696f6e5f696434010c753634000120746f6b656e5f69643c011c546f6b656e4964000100205472616e736665720c01387472616e73616374696f6e5f696434010c753634000108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e4964000200385472616e736665725061796f75741001387472616e73616374696f6e5f696434010c753634000108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e4964000118616d6f756e7420011075313238000300244e46545061796f75740801146f776e657214011c4163746f724964000118616d6f756e74200110753132380004001c417070726f76650c01387472616e73616374696f6e5f696434010c753634000108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e49640005004044656c656761746564417070726f76650c01387472616e73616374696f6e5f696434010c75363400011c6d65737361676544015c44656c656761746564417070726f76654d6573736167650001247369676e61747572654801205b75383b2036345d000600144f776e6572040120746f6b656e5f69643c011c546f6b656e4964000700284973417070726f766564080108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e496400080014436c6561720401407472616e73616374696f6e5f686173684c01104832353600090000340000050600381020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e14746f6b656e34546f6b656e4d6574616461746100001001106e616d65040118537472696e6700012c6465736372697074696f6e040118537472696e670001146d65646961040118537472696e670001247265666572656e6365040118537472696e6700003c083c7072696d69746976655f74797065731055323536000004004001205b7536343b20345d000040000003040000003400441020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e2464656c6567617465645c44656c656761746564417070726f76654d6573736167650000140138746f6b656e5f6f776e65725f696414011c4163746f724964000144617070726f7665645f6163746f725f696414011c4163746f7249640001386e66745f70726f6772616d5f696414011c4163746f724964000120746f6b656e5f69643c011c546f6b656e496400015065787069726174696f6e5f74696d657374616d7034010c753634000048000003400000001c004c083c7072696d69746976655f74797065731048323536000004001801205b75383b2033325d00005008186e66745f696f204e46544576656e74000118205472616e73666572040054012c4e46545472616e73666572000000385472616e736665725061796f757404005801444e46545472616e736665725061796f7574000100244e46545061796f757404001001185061796f757400020020417070726f76616c04005c012c4e4654417070726f76616c000300144f776e65720801146f776e657214011c4163746f724964000120746f6b656e5f69643c011c546f6b656e4964000400284973417070726f7665640c0108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e4964000120617070726f766564600110626f6f6c00050000541020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e08696f2c4e46545472616e7366657200000c011066726f6d14011c4163746f724964000108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e49640000581020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e08696f444e46545472616e736665725061796f7574000010011066726f6d14011c4163746f724964000108746f14011c4163746f724964000120746f6b656e5f69643c011c546f6b656e496400011c7061796f7574731001185061796f757400005c1020676561725f6c6962486e6f6e5f66756e6769626c655f746f6b656e08696f2c4e4654417070726f76616c00000c01146f776e657214011c4163746f724964000140617070726f7665645f6163636f756e7414011c4163746f724964000120746f6b656e5f69643c011c546f6b656e496400006000000500006408186e66745f696f14496f4e46540000100114746f6b656e680128496f4e46545374617465000120746f6b656e5f69643c011c546f6b656e49640001146f776e657214011c4163746f7249640001307472616e73616374696f6e739801545665633c28483235362c204e46544576656e74293e00006808186e66745f696f28496f4e4654537461746500002001106e616d65040118537472696e6700011873796d626f6c040118537472696e67000120626173655f757269040118537472696e6700012c6f776e65725f62795f69646c015c5665633c28546f6b656e49642c204163746f724964293e00013c746f6b656e5f617070726f76616c737401705665633c28546f6b656e49642c205665633c4163746f7249643e293e000150746f6b656e5f6d657461646174615f62795f69648001945665633c28546f6b656e49642c204f7074696f6e3c546f6b656e4d657461646174613e293e000140746f6b656e735f666f725f6f776e65728c01705665633c284163746f7249642c205665633c546f6b656e49643e293e000124726f79616c746965730801444f7074696f6e3c526f79616c746965733e00006c000002700070000004083c140074000002780078000004083c7c007c000002140080000002840084000004083c88008804184f7074696f6e04045401380108104e6f6e6500000010536f6d6504003800000100008c00000290009000000408149400940000023c00980000029c009c000004084c5000";

  const metadata = getProgramMetadata(`0x${meta}`);

  const message: any = {
    destination: programIDNFT, // programId
    payload:{burn:[2,"0x4f0e33400797ff5fa36b9e810115a1f9ce6f85365e4ad2a9fdf8b8d38634aa0c"]}, // Add tokenID and Transfer ID
    gasLimit: 1599819245,
    value: 0,
  };

  const signer = async () => {
    const localaccount = account?.address;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount) {
      // Create a message extrinsic
      const transferExtrinsic = api.message.send(message, metadata);

      const injector = await web3FromSource(accounts[0].meta.source);

      transferExtrinsic
        .signAndSend(
          accounts[0].address,
          { signer: injector.signer },
          ({ status }) => {
            if (status.isInBlock) {
              console.log(
                `Completed at block hash #${status.asInBlock.toString()}`
              );
              alert.success(`Block hash #${status.asInBlock.toString()}`);
            } else {
              console.log(`Current status: ${status.type}`);
              if (status.type === "Finalized") {
                alert.success(status.type);
              }
            }
          }
        )
        .catch((error: any) => {
          console.log(":( transaction failed", error);
        });
    } else {
      alert.error("Account not available to sign");
    }

    const unsub = api.gearEvents.subscribeToGearEvent(
        "UserMessageSent",
        ({
          data: {
            message: { id, source, destination, payload, value },
          },
        }) => {
          console.log(`
        messageId: ${id.toHex()}
        source: ${source.toHex()}
        payload: ${payload.toHuman()}
        `);
        }
      );
  };

  return <Button text="NFT Burn" onClick={signer} />;
}

export { BurnNFT };