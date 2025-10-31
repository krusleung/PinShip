package app.pinship;

import android.app.Activity;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.ScrollView;
import android.widget.Button;
import android.view.View;
import android.graphics.Color;
import android.view.Gravity;

public class SimpleMainActivity extends Activity {

    private LinearLayout mainLayout;
    private String currentTab = "home";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Create main layout
        LinearLayout rootLayout = new LinearLayout(this);
        rootLayout.setOrientation(LinearLayout.VERTICAL);
        rootLayout.setBackgroundColor(Color.parseColor("#f5f5f5"));

        // Create header
        TextView header = new TextView(this);
        header.setText("PinShip");
        header.setTextSize(24);
        header.setTextColor(Color.WHITE);
        header.setBackgroundColor(Color.parseColor("#f20c00"));
        header.setPadding(40, 40, 40, 40);
        header.setGravity(Gravity.CENTER);
        rootLayout.addView(header);

        // Create content area
        ScrollView scrollView = new ScrollView(this);
        mainLayout = new LinearLayout(this);
        mainLayout.setOrientation(LinearLayout.VERTICAL);
        mainLayout.setPadding(30, 30, 30, 30);
        scrollView.addView(mainLayout);

        LinearLayout.LayoutParams scrollParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            0,
            1.0f
        );
        scrollView.setLayoutParams(scrollParams);
        rootLayout.addView(scrollView);

        // Create bottom navigation
        LinearLayout bottomNav = new LinearLayout(this);
        bottomNav.setOrientation(LinearLayout.HORIZONTAL);
        bottomNav.setBackgroundColor(Color.WHITE);
        bottomNav.setPadding(0, 20, 0, 20);

        Button homeBtn = createNavButton("Home", "home");
        Button shipBtn = createNavButton("Ship", "ship");
        Button profileBtn = createNavButton("Profile", "profile");

        bottomNav.addView(homeBtn);
        bottomNav.addView(shipBtn);
        bottomNav.addView(profileBtn);

        rootLayout.addView(bottomNav);

        // Set the layout
        setContentView(rootLayout);

        // Load initial content
        showHomeContent();
    }

    private Button createNavButton(String text, String tab) {
        Button button = new Button(this);
        button.setText(text);
        button.setBackgroundColor(Color.TRANSPARENT);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
            0,
            LinearLayout.LayoutParams.WRAP_CONTENT,
            1.0f
        );
        button.setLayoutParams(params);

        button.setOnClickListener(v -> {
            currentTab = tab;
            if (tab.equals("home")) {
                showHomeContent();
            } else if (tab.equals("ship")) {
                showShipContent();
            } else if (tab.equals("profile")) {
                showProfileContent();
            }
        });

        return button;
    }

    private void showHomeContent() {
        mainLayout.removeAllViews();

        TextView title = new TextView(this);
        title.setText("Your Shipments");
        title.setTextSize(20);
        title.setTextColor(Color.BLACK);
        title.setPadding(0, 0, 0, 20);
        mainLayout.addView(title);

        // Add shipment card
        LinearLayout card = createShipmentCard(
            "PS001234",
            "In Transit",
            "Central, Hong Kong",
            "Est. Delivery: 2024-01-15"
        );
        mainLayout.addView(card);

        LinearLayout card2 = createShipmentCard(
            "SP005678",
            "Delivered",
            "Causeway Bay, HK",
            "Delivered: 2024-01-12"
        );
        mainLayout.addView(card2);
    }

    private void showShipContent() {
        mainLayout.removeAllViews();

        TextView title = new TextView(this);
        title.setText("Ship Your Package");
        title.setTextSize(20);
        title.setTextColor(Color.BLACK);
        title.setPadding(0, 0, 0, 20);
        mainLayout.addView(title);

        // Local Shipping Option
        LinearLayout localCard = new LinearLayout(this);
        localCard.setOrientation(LinearLayout.VERTICAL);
        localCard.setBackgroundColor(Color.WHITE);
        localCard.setPadding(30, 30, 30, 30);
        LinearLayout.LayoutParams cardParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        cardParams.setMargins(0, 0, 0, 20);
        localCard.setLayoutParams(cardParams);

        TextView localTitle = new TextView(this);
        localTitle.setText("🏙️ Local Shipping");
        localTitle.setTextSize(18);
        localTitle.setTextColor(Color.BLACK);
        localCard.addView(localTitle);

        TextView localDesc = new TextView(this);
        localDesc.setText("Hong Kong Local Delivery\n• Pin-ship (3-7 days)\n• Speed Post (1-3 days)");
        localDesc.setTextSize(14);
        localDesc.setPadding(0, 10, 0, 20);
        localCard.addView(localDesc);

        Button selectLocal = new Button(this);
        selectLocal.setText("Select Local Shipping");
        selectLocal.setBackgroundColor(Color.parseColor("#f20c00"));
        selectLocal.setTextColor(Color.WHITE);
        localCard.addView(selectLocal);

        mainLayout.addView(localCard);

        // Overseas Shipping Option
        LinearLayout overseasCard = new LinearLayout(this);
        overseasCard.setOrientation(LinearLayout.VERTICAL);
        overseasCard.setBackgroundColor(Color.WHITE);
        overseasCard.setPadding(30, 30, 30, 30);
        overseasCard.setAlpha(0.6f);
        overseasCard.setLayoutParams(cardParams);

        TextView overseasTitle = new TextView(this);
        overseasTitle.setText("✈️ Overseas Shipping");
        overseasTitle.setTextSize(18);
        overseasTitle.setTextColor(Color.BLACK);
        overseasCard.addView(overseasTitle);

        TextView overseasDesc = new TextView(this);
        overseasDesc.setText("International Delivery\n• 200+ Countries\n• Coming Soon");
        overseasDesc.setTextSize(14);
        overseasDesc.setPadding(0, 10, 0, 20);
        overseasCard.addView(overseasDesc);

        mainLayout.addView(overseasCard);
    }

    private void showProfileContent() {
        mainLayout.removeAllViews();

        TextView title = new TextView(this);
        title.setText("Profile");
        title.setTextSize(20);
        title.setTextColor(Color.BLACK);
        title.setPadding(0, 0, 0, 20);
        mainLayout.addView(title);

        TextView name = new TextView(this);
        name.setText("John Doe");
        name.setTextSize(18);
        name.setTextColor(Color.BLACK);
        name.setGravity(Gravity.CENTER);
        name.setPadding(0, 20, 0, 10);
        mainLayout.addView(name);

        TextView email = new TextView(this);
        email.setText("john.doe@example.com");
        email.setTextSize(14);
        email.setTextColor(Color.GRAY);
        email.setGravity(Gravity.CENTER);
        email.setPadding(0, 0, 0, 30);
        mainLayout.addView(email);

        // Settings
        addProfileItem("👤 Personal Information");
        addProfileItem("💳 Billing ID: HK-2024-001234");
        addProfileItem("🌐 Language: English");
        addProfileItem("🌙 Theme: Light Mode");

        Button logoutBtn = new Button(this);
        logoutBtn.setText("Logout");
        logoutBtn.setBackgroundColor(Color.parseColor("#F44336"));
        logoutBtn.setTextColor(Color.WHITE);
        LinearLayout.LayoutParams btnParams = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        btnParams.setMargins(0, 30, 0, 0);
        logoutBtn.setLayoutParams(btnParams);
        mainLayout.addView(logoutBtn);
    }

    private LinearLayout createShipmentCard(String id, String status, String location, String delivery) {
        LinearLayout card = new LinearLayout(this);
        card.setOrientation(LinearLayout.VERTICAL);
        card.setBackgroundColor(Color.WHITE);
        card.setPadding(30, 30, 30, 30);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        params.setMargins(0, 0, 0, 20);
        card.setLayoutParams(params);

        TextView idText = new TextView(this);
        idText.setText(id);
        idText.setTextSize(16);
        idText.setTextColor(Color.parseColor("#f20c00"));
        card.addView(idText);

        TextView statusText = new TextView(this);
        statusText.setText(status);
        statusText.setTextSize(14);
        statusText.setPadding(0, 5, 0, 5);
        card.addView(statusText);

        TextView locationText = new TextView(this);
        locationText.setText("📍 " + location);
        locationText.setTextSize(14);
        locationText.setPadding(0, 5, 0, 5);
        card.addView(locationText);

        TextView deliveryText = new TextView(this);
        deliveryText.setText("📅 " + delivery);
        deliveryText.setTextSize(14);
        card.addView(deliveryText);

        return card;
    }

    private void addProfileItem(String text) {
        TextView item = new TextView(this);
        item.setText(text);
        item.setTextSize(16);
        item.setTextColor(Color.BLACK);
        item.setBackgroundColor(Color.WHITE);
        item.setPadding(30, 25, 30, 25);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
            LinearLayout.LayoutParams.MATCH_PARENT,
            LinearLayout.LayoutParams.WRAP_CONTENT
        );
        params.setMargins(0, 5, 0, 0);
        item.setLayoutParams(params);
        mainLayout.addView(item);
    }
}