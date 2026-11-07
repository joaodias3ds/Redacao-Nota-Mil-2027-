package com.example.ui.screens

import android.content.Intent
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.gestures.detectHorizontalDragGestures
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.outlined.BookmarkBorder
import androidx.compose.material.icons.outlined.Description
import androidx.compose.material.icons.outlined.Edit
import androidx.compose.material.icons.outlined.Share
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Icon
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.RepertoryCard
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextSecondary
import com.example.ui.viewmodel.FeedTab

@Composable
fun FeedScreen(
  repertories: List<RepertoryCard>,
  currentFeedTab: FeedTab,
  currentIndex: Int,
  viewedCardsCount: Int,
  onSelectTab: (FeedTab) -> Unit,
  onNextCard: (Int) -> Unit,
  onPrevCard: (Int) -> Unit,
  onToggleSave: (String) -> Unit,
  onUseRepertory: (RepertoryCard) -> Unit,
  modifier: Modifier = Modifier
) {
  val context = LocalContext.current
  var showSourceDialog by remember { mutableStateOf<RepertoryCard?>(null) }

  val filteredList = when (currentFeedTab) {
    FeedTab.PARA_VOCE -> repertories
    FeedTab.TEMAS -> repertories
    FeedTab.SALVOS -> repertories.filter { it.isSaved }
  }

  val activeCard = if (filteredList.isNotEmpty()) {
    filteredList[currentIndex.coerceIn(0, filteredList.lastIndex)]
  } else null

  var dragAccumulator by remember { mutableFloatStateOf(0f) }

  Box(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFF0F0F11))
      .statusBarsPadding()
      .pointerInput(filteredList.size) {
        detectHorizontalDragGestures(
          onDragEnd = {
            if (dragAccumulator < -60) {
              onNextCard(filteredList.size)
            } else if (dragAccumulator > 60) {
              onPrevCard(filteredList.size)
            }
            dragAccumulator = 0f
          },
          onDragCancel = { dragAccumulator = 0f },
          onHorizontalDrag = { _, dragAmount ->
            dragAccumulator += dragAmount
          }
        )
      }
  ) {
    // Decorative subtle magenta background glow circle at top right
    Box(
      modifier = Modifier
        .align(Alignment.TopEnd)
        .size(340.dp)
        .background(
          brush = Brush.radialGradient(
            colors = listOf(
              PinkPrimary.copy(alpha = 0.45f),
              Color.Transparent
            )
          )
        )
    )

    Column(
      modifier = Modifier
        .fillMaxSize()
        .padding(horizontal = 20.dp)
        .padding(top = 12.dp, bottom = 80.dp)
    ) {
      // Top Navigation Tabs & Counter Pill
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        // Sub-tabs
        Row(
          horizontalArrangement = Arrangement.spacedBy(18.dp),
          verticalAlignment = Alignment.CenterVertically
        ) {
          FeedTabItem(
            title = "Para você",
            isSelected = currentFeedTab == FeedTab.PARA_VOCE,
            onClick = { onSelectTab(FeedTab.PARA_VOCE) },
            testTag = "feed_tab_para_voce"
          )
          FeedTabItem(
            title = "Temas",
            isSelected = currentFeedTab == FeedTab.TEMAS,
            onClick = { onSelectTab(FeedTab.TEMAS) },
            testTag = "feed_tab_temas"
          )
          FeedTabItem(
            title = "Salvos",
            isSelected = currentFeedTab == FeedTab.SALVOS,
            onClick = { onSelectTab(FeedTab.SALVOS) },
            testTag = "feed_tab_salvos"
          )
        }

        // Counter pill (e.g. 3/5 with pink dot)
        Surface(
          shape = RoundedCornerShape(12.dp),
          color = Color(0xFF23232A),
          modifier = Modifier.padding(vertical = 4.dp)
        ) {
          Row(
            modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp)
          ) {
            Box(
              modifier = Modifier
                .size(6.dp)
                .clip(CircleShape)
                .background(PinkPrimary)
            )
            Text(
              text = "$viewedCardsCount/5",
              color = Color.White,
              fontSize = 12.sp,
              fontWeight = FontWeight.SemiBold
            )
          }
        }
      }

      Spacer(modifier = Modifier.height(14.dp))

      // Top Segmented Progress Bar (5 segments)
      Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(6.dp)
      ) {
        val totalSegments = 5
        for (i in 0 until totalSegments) {
          val isActive = i <= currentIndex
          Box(
            modifier = Modifier
              .weight(1f)
              .height(3.dp)
              .clip(RoundedCornerShape(2.dp))
              .background(if (isActive) PinkPrimary else Color(0xFF2A2A32))
          )
        }
      }

      Spacer(modifier = Modifier.height(30.dp))

      if (activeCard != null) {
        // Main Card Area with content + vertical side actions
        Row(
          modifier = Modifier
            .fillMaxWidth()
            .weight(1f),
          horizontalArrangement = Arrangement.SpaceBetween
        ) {
          // Left: Main Content (Badge, Title, Author, Description, Como Usar)
          Column(
            modifier = Modifier
              .weight(1f)
              .padding(end = 12.dp),
            verticalArrangement = Arrangement.SpaceBetween
          ) {
            Column {
              // Badge: CONCEITO · COMPETÊNCIA 2
              Box(
                modifier = Modifier
                  .clip(RoundedCornerShape(16.dp))
                  .background(Color.White)
                  .padding(horizontal = 14.dp, vertical = 6.dp)
              ) {
                Text(
                  text = activeCard.badge,
                  color = PinkPrimary,
                  fontSize = 12.sp,
                  fontWeight = FontWeight.Bold,
                  letterSpacing = 0.5.sp
                )
              }

              Spacer(modifier = Modifier.height(24.dp))

              // Title: e.g. Modernidade líquida
              Text(
                text = activeCard.title,
                color = Color.White,
                fontSize = 34.sp,
                lineHeight = 38.sp,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.testTag("feed_card_title")
              )

              Spacer(modifier = Modifier.height(8.dp))

              // Author & Year
              Text(
                text = activeCard.authorYear,
                color = Color(0xFF9CA3AF),
                fontSize = 16.sp,
                fontWeight = FontWeight.Medium
              )

              Spacer(modifier = Modifier.height(24.dp))

              // Concept / Idea description
              Text(
                text = activeCard.description,
                color = Color(0xFFEDEDED),
                fontSize = 17.sp,
                lineHeight = 26.sp,
                fontWeight = FontWeight.Normal
              )
            }

            // Bottom Callout: COMO USAR
            Column(
              modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 20.dp)
            ) {
              Text(
                text = "COMO USAR",
                color = PinkPrimary,
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                letterSpacing = 0.8.sp
              )
              Spacer(modifier = Modifier.height(6.dp))
              Text(
                text = activeCard.howToUse,
                color = Color(0xFFE5E7EB),
                fontSize = 14.sp,
                lineHeight = 20.sp
              )
            }
          }

          // Right: Vertical Side Actions Column
          Column(
            modifier = Modifier.width(64.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(22.dp)
          ) {
            // 1. Salvar
            FeedSideAction(
              icon = if (activeCard.isSaved) Icons.Filled.Bookmark else Icons.Outlined.BookmarkBorder,
              label = if (activeCard.isSaved) "Salvo" else "Salvar",
              tint = if (activeCard.isSaved) PinkPrimary else Color.White,
              onClick = { onToggleSave(activeCard.id) },
              testTag = "feed_action_salvar"
            )

            // 2. Usar
            FeedSideAction(
              icon = Icons.Outlined.Edit,
              label = "Usar",
              tint = Color.White,
              onClick = { onUseRepertory(activeCard) },
              testTag = "feed_action_usar"
            )

            // 3. Enviar (Share)
            FeedSideAction(
              icon = Icons.Outlined.Share,
              label = "Enviar",
              tint = Color.White,
              onClick = {
                val sendIntent = Intent().apply {
                  action = Intent.ACTION_SEND
                  putExtra(
                    Intent.EXTRA_TEXT,
                    "Repertório do App Redação:\n${activeCard.title} - ${activeCard.authorYear}\n\n${activeCard.description}"
                  )
                  type = "text/plain"
                }
                context.startActivity(Intent.createChooser(sendIntent, "Compartilhar repertório"))
              },
              testTag = "feed_action_enviar"
            )

            // 4. Fonte
            FeedSideAction(
              icon = Icons.Outlined.Description,
              label = "Fonte",
              tint = Color.White,
              onClick = { showSourceDialog = activeCard },
              testTag = "feed_action_fonte"
            )
          }
        }
      } else {
        // Empty state for "Salvos"
        Box(
          modifier = Modifier
            .fillMaxSize()
            .padding(bottom = 60.dp),
          contentAlignment = Alignment.Center
        ) {
          Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Icon(
              imageVector = Icons.Outlined.BookmarkBorder,
              contentDescription = null,
              tint = Color(0xFF6B7280),
              modifier = Modifier.size(54.dp)
            )
            Spacer(modifier = Modifier.height(14.dp))
            Text(
              text = "Nenhum repertório salvo ainda",
              color = Color.White,
              fontSize = 17.sp,
              fontWeight = FontWeight.Medium
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
              text = "Toque em Salvar nos cards de repertório para vê-los aqui.",
              color = Color(0xFF9CA3AF),
              fontSize = 13.sp
            )
          }
        }
      }
    }
  }

  // Source details dialog
  showSourceDialog?.let { card ->
    AlertDialog(
      onDismissRequest = { showSourceDialog = null },
      title = {
        Text(
          text = "Fonte e Referência",
          fontWeight = FontWeight.Bold,
          color = PinkPrimary
        )
      },
      text = {
        Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
          Text(text = card.title, fontWeight = FontWeight.Bold)
          Text(text = "Autor / Contexto: ${card.authorYear}")
          Text(text = "Referência Bibliográfica:\n${card.source}", fontSize = 13.sp, color = TextSecondary)
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "Dica para a Redação: Garanta que a citação seja legítima, produtiva e diretamente relacionada à tese que você defenderá.",
            fontSize = 12.sp,
            color = TextSecondary
          )
        }
      },
      confirmButton = {
        TextButton(onClick = { showSourceDialog = null }) {
          Text("Fechar", color = PinkPrimary)
        }
      }
    )
  }
}

@Composable
private fun FeedTabItem(
  title: String,
  isSelected: Boolean,
  onClick: () -> Unit,
  testTag: String
) {
  Column(
    modifier = Modifier
      .clickable(onClick = onClick)
      .padding(vertical = 4.dp)
      .testTag(testTag),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Text(
      text = title,
      color = if (isSelected) Color.White else Color(0xFF9CA3AF),
      fontSize = 16.sp,
      fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium
    )
    Spacer(modifier = Modifier.height(4.dp))
    if (isSelected) {
      Box(
        modifier = Modifier
          .width(28.dp)
          .height(3.dp)
          .clip(RoundedCornerShape(2.dp))
          .background(PinkPrimary)
      )
    } else {
      Spacer(modifier = Modifier.height(3.dp))
    }
  }
}

@Composable
private fun FeedSideAction(
  icon: ImageVector,
  label: String,
  tint: Color,
  onClick: () -> Unit,
  testTag: String
) {
  Column(
    modifier = Modifier
      .clickable(onClick = onClick)
      .padding(vertical = 4.dp)
      .testTag(testTag),
    horizontalAlignment = Alignment.CenterHorizontally
  ) {
    Icon(
      imageVector = icon,
      contentDescription = label,
      tint = tint,
      modifier = Modifier.size(26.dp)
    )
    Spacer(modifier = Modifier.height(4.dp))
    Text(
      text = label,
      color = tint,
      fontSize = 11.sp,
      fontWeight = FontWeight.Medium
    )
  }
}
