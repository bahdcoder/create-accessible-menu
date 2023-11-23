/**
 * when i click the menu trigger,
 * the menu appears
 */

function app() {
  const menuTrigger =
    document.querySelector("#profile-menu");
  const menu = document.querySelector(
    "#profile-menu-content"
  );

  const allMenuItems = menu.querySelectorAll(
    '[role="menuitem"]'
  );

  function closeMenu() {
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }

  function handleMenuEscapeKeypress(event) {
    // if user pressed escape key
    if (event.key === "Escape") {
      toggleMenu();
    }
  }

  function handleMenuItemArrowKeyPress(
    event,
    menuItemIndex
  ) {
    // create some helpful variables : isLastMenuItem, isFirstMenuItem
    const isLastMenuItem =
      menuItemIndex === allMenuItems.length - 1;
    const isFirstMenuItem = menuItemIndex === 0;

    const nextMenuItem = allMenuItems.item(
      menuItemIndex + 1
    );
    const previousMenuItem = allMenuItems.item(
      menuItemIndex - 1
    );

    // if the user pressed arrow right or arrow down
    if (
      event.key === "ArrowRight" ||
      event.key === "ArrowDown"
    ) {
      // if user is on last item, focus on first menuitem
      if (isLastMenuItem) {
        allMenuItems.item(0).focus();

        return;
      }
      // then focus on next menu item
      nextMenuItem.focus();
    }

    // if the user pressed arrow up or arrow left
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowLeft"
    ) {
      if (isFirstMenuItem) {
        allMenuItems.item(allMenuItems.length - 1).focus();
        return;
      }

      previousMenuItem.focus();
    }
    // then focus on the previous menu item
    // if the user is on first menu item, focus on last menuitem
  }

  function openMenu() {
    menuTrigger.ariaExpanded = "true";
    allMenuItems.item(0).focus();

    menu.addEventListener(
      "keyup",
      handleMenuEscapeKeypress
    );

    // for each menu item, register an event listener for the keyup event
    allMenuItems.forEach(function (
      menuItem,
      menuItemIndex
    ) {
      menuItem.addEventListener("keyup", function (event) {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });
  }

  function toggleMenu() {
    const isExpanded =
      menuTrigger.attributes["aria-expanded"].value ===
      "true";
    menu.classList.toggle("menu-active");

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuTrigger.addEventListener("click", toggleMenu);
}

app();

/**
 * When the menu is active and i press the arrow down or arrow right keys,
 * focus is moved to the next menu item.
 * if i am on the last menu item,
 * focus moves back to the first menu item
 */

/**
 * when the menu is active and i press the arrow up or arrow left keys,
 * focus is moved to the previous menu item.
 * if i am on the first menu item,
 * focus moves to the last menu item.
 */
