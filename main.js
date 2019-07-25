;(
  function() {
    "use strict";

    /**
     * 
     * @param {string} input 
     */
    function generateRandomResponseMessage(input) {
      switch (Math.floor(Math.random() * 6)) {
        case 0: {
          return `${input} is right!`;
        }
        case 1: {
          return `${input} is wrong!`;
        }
        case 3: {
          return `What do you mean, ${input}!?`;
        }
        case 4: {
          return `My dad used to say "${input}" all the time.`;
        }
        case 5: {
          return `My dad used to say "${input}" all the time.`;
        }
        default: {
          return "ok";
        }
      }
    }

    /**
     * 
     * @param {HTMLElement} screenEl
     * @param {?HTMLElement} cursorEl
     */
    function createInputLine() {
      Array.from(
        document.querySelectorAll("[id='current-line']")
      ).forEach(
        function(element) {
          element.id = "";
        }
      );
      const el = document.createElement("div");
      el.contentEditable = true;;
      el.className = "screen-line user-input-line input-line";
      el.spellcheck = false;
      el.setAttribute("autofocus", "");
      el.id = "current-line";

      return el;
    }

    /**
     * 
     * @param {HTMLElement} currentInput 
     * @param {HTMLElement} screenEl 
     */
    function addHistoryLine(currentInput, screenEl) {
      const content = currentInput.textContent;

      const historyLine = document.createElement("div");
      historyLine.className = "screen-line user-input-line history-line";
      historyLine.textContent = content;

      screenEl.insertBefore(historyLine, currentInput);
    }

    /**
     * 
     * @param {HTMLElement} currentInput 
     * @param {HTMLElement} screenEl 
     */
    function addResponseLine(currentInput, screenEl) {
      const responseLine = document.createElement("div");
      responseLine.className = "screen-line response-line";

      responseLine.textContent = generateRandomResponseMessage(currentInput.textContent);

      screenEl.insertBefore(responseLine, currentInput);
    }

    /**
     * 
     * @param {HTMLElement} currentInput 
     */
    function setFocus(currentInput) {
      currentInput.focus();

      if (currentInput.childNodes.length > 0) {
        const range = document.createRange();
        const selection = window.getSelection();
        selection.removeAllRanges();
        range.setStartAfter(
            currentInput.childNodes.item(currentInput.childNodes.length - 1)
        );
        range.collapse(true);
  
        selection.addRange(range);
      }
    }

    function init() {
      const screenEl = document.getElementById("screen");

      const line = createInputLine(screenEl);
      screenEl.appendChild(line);
      line.focus();

      line.addEventListener(
        "keypress",
        /**
         * 
         * @param {KeyboardEvent} event 
         */
        function(event) {
          if (event.key === "Enter") {
            event.preventDefault();
            addHistoryLine(line, screenEl);
            addResponseLine(line, screenEl);
            line.textContent = "";
          }
        },
        false
      );

      line.addEventListener(
        "keydown",
        /**
         * 
         * @param {KeyboardEvent} event 
         */
        function(event) {
          if (
            event.key === "ArrowLeft" ||
            event.key === "ArrowRight" ||
            event.key === "ArrowUp" ||
            event.key === "ArrowDown" ||
            event.key === "Home" ||
            event.key === "End"
          ) {
            event.preventDefault();
          }
        },
        false
      );

      screenEl.addEventListener(
        "click",
        /**
         * 
         * @param {MouseEvent} event 
         */
        function(event) {
          // if (event.target === screenEl) {
            setFocus(line);
            // line.focus();
          // }
          event.preventDefault();
        }
      );
    }

    if (document.readyState === "complete") {
      init();
    }
    else {
      document.addEventListener(
        "DOMContentLoaded",
        init
      );
    }
  }
)();
