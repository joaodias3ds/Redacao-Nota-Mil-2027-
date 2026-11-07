package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.automirrored.outlined.ShowChart
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.ViewAgenda
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.FloatingActionButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.viewmodel.MainTab

@Composable
fun AppBottomNavigation(
  currentTab: MainTab,
  onTabSelected: (MainTab) -> Unit,
  onFabClick: () -> Unit,
  modifier: Modifier = Modifier
) {
  Box(
    modifier = modifier
      .fillMaxWidth()
      .navigationBarsPadding(),
    contentAlignment = Alignment.BottomCenter
  ) {
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .height(68.dp),
      color = Color.White,
      shadowElevation = 10.dp,
      tonalElevation = 0.dp
    ) {
      Row(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 8.dp),
        horizontalArrangement = Arrangement.SpaceAround,
        verticalAlignment = Alignment.CenterVertically
      ) {
        // Tab 1: Hoje
        NavTabItem(
          label = "Hoje",
          icon = Icons.Outlined.Home,
          isSelected = currentTab == MainTab.HOJE,
          onClick = { onTabSelected(MainTab.HOJE) },
          testTag = "nav_hoje"
        )

        // Tab 2: Feed
        NavTabItem(
          label = "Feed",
          icon = Icons.Outlined.ViewAgenda,
          isSelected = currentTab == MainTab.FEED,
          onClick = { onTabSelected(MainTab.FEED) },
          testTag = "nav_feed"
        )

        // Middle spacer for FAB
        Spacer(modifier = Modifier.size(56.dp))

        // Tab 3: Evolução
        NavTabItem(
          label = "Evolução",
          icon = Icons.AutoMirrored.Outlined.ShowChart,
          isSelected = currentTab == MainTab.EVOLUCAO,
          onClick = { onTabSelected(MainTab.EVOLUCAO) },
          testTag = "nav_evolucao"
        )

        // Tab 4: Perfil
        NavTabItem(
          label = "Perfil",
          icon = Icons.Outlined.Person,
          isSelected = currentTab == MainTab.PERFIL,
          onClick = { onTabSelected(MainTab.PERFIL) },
          testTag = "nav_perfil"
        )
      }
    }

    // Central Floating Action Button (+)
    FloatingActionButton(
      onClick = onFabClick,
      modifier = Modifier
        .offset(y = (-18).dp)
        .size(54.dp)
        .testTag("fab_nova_redacao"),
      shape = CircleShape,
      containerColor = PinkPrimary,
      contentColor = Color.White,
      elevation = FloatingActionButtonDefaults.elevation(defaultElevation = 6.dp)
    ) {
      Icon(
        imageVector = Icons.Default.Add,
        contentDescription = "Nova redação",
        modifier = Modifier.size(28.dp)
      )
    }
  }
}

@Composable
private fun NavTabItem(
  label: String,
  icon: ImageVector,
  isSelected: Boolean,
  onClick: () -> Unit,
  testTag: String
) {
  val contentColor = if (isSelected) PinkPrimary else TextMuted

  Column(
    modifier = Modifier
      .clip(CircleShape)
      .clickable(onClick = onClick)
      .padding(horizontal = 12.dp, vertical = 6.dp)
      .testTag(testTag),
    horizontalAlignment = Alignment.CenterHorizontally,
    verticalArrangement = Arrangement.Center
  ) {
    Icon(
      imageVector = icon,
      contentDescription = label,
      tint = contentColor,
      modifier = Modifier.size(24.dp)
    )
    Spacer(modifier = Modifier.height(2.dp))
    Text(
      text = label,
      color = contentColor,
      fontSize = 11.sp,
      fontWeight = if (isSelected) FontWeight.SemiBold else FontWeight.Medium
    )
  }
}
