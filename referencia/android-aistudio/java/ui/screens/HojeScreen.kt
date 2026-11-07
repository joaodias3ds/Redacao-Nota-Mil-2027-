package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowForwardIos
import androidx.compose.material.icons.outlined.Notifications
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.EssayDraft
import com.example.data.model.EssayEvaluation
import com.example.data.repository.EssayRepository
import com.example.ui.components.HorizontalStepper
import com.example.ui.theme.BorderLight
import com.example.ui.theme.DarkCardBg
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.PinkPrimaryDark
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun HojeScreen(
  draft: EssayDraft,
  evaluation: EssayEvaluation,
  viewedFeedCards: Int,
  totalFeedCards: Int = 5,
  onContinueDraft: () -> Unit,
  onViewStatus: () -> Unit,
  onOpenFeed: () -> Unit,
  onOpenThemeProposal: () -> Unit,
  onNotificationsClick: () -> Unit = {},
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()
  val lineCount = EssayRepository.calculateEstimatedLines(draft.text).coerceAtLeast(18)

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 16.dp, bottom = 100.dp)
  ) {
    // Header Greeting & Notification Bell
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(bottom = 20.dp),
      horizontalArrangement = Arrangement.SpaceBetween,
      verticalAlignment = Alignment.CenterVertically
    ) {
      Column {
        Text(
          text = "Bom dia",
          color = TextSecondary,
          fontSize = 14.sp
        )
        Text(
          text = "Oi, Marina",
          color = TextPrimary,
          fontSize = 24.sp,
          fontWeight = FontWeight.Bold
        )
      }

      // Bell icon with badge
      Box(
        modifier = Modifier
          .size(44.dp)
          .clip(CircleShape)
          .background(Color.White)
          .border(1.dp, BorderLight, CircleShape)
          .clickable(onClick = onNotificationsClick)
          .testTag("btn_notifications"),
        contentAlignment = Alignment.Center
      ) {
        Icon(
          imageVector = Icons.Outlined.Notifications,
          contentDescription = "Notificações",
          tint = TextPrimary,
          modifier = Modifier.size(22.dp)
        )
        // Red unread badge dot
        Box(
          modifier = Modifier
            .size(8.dp)
            .clip(CircleShape)
            .background(PinkPrimary)
            .align(Alignment.TopEnd)
            .padding(top = 8.dp, end = 8.dp)
        )
      }
    }

    // Card 1: Primary Magenta Card - Continuar redação
    Card(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(24.dp))
        .clickable(onClick = onContinueDraft)
        .testTag("card_continuar_redacao"),
      shape = RoundedCornerShape(24.dp),
      colors = CardDefaults.cardColors(containerColor = PinkPrimary),
      elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .background(
            brush = Brush.verticalGradient(
              colors = listOf(
                PinkPrimary,
                Color(0xFF9E0043)
              )
            )
          )
          .padding(20.dp)
      ) {
        // Top row: RASCUNHO pill and Salvo há 2 min
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Box(
            modifier = Modifier
              .clip(RoundedCornerShape(12.dp))
              .background(Color.White.copy(alpha = 0.25f))
              .padding(horizontal = 10.dp, vertical = 4.dp)
          ) {
            Text(
              text = "RASCUNHO",
              color = Color.White,
              fontSize = 11.sp,
              fontWeight = FontWeight.Bold,
              letterSpacing = 0.5.sp
            )
          }

          Text(
            text = draft.lastSaved,
            color = Color.White.copy(alpha = 0.85f),
            fontSize = 12.sp
          )
        }

        Spacer(modifier = Modifier.height(14.dp))

        // Card Title
        Text(
          text = "Continuar redação",
          color = Color.White,
          fontSize = 22.sp,
          fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(6.dp))

        // Theme name
        Text(
          text = "Tema: ${draft.theme}",
          color = Color.White.copy(alpha = 0.95f),
          fontSize = 14.sp,
          lineHeight = 20.sp
        )

        Spacer(modifier = Modifier.height(18.dp))

        // Progress Bar (white track)
        LinearProgressIndicator(
          progress = { (lineCount.toFloat() / 30f).coerceIn(0f, 1f) },
          modifier = Modifier
            .fillMaxWidth()
            .height(6.dp)
            .clip(RoundedCornerShape(3.dp)),
          color = Color.White,
          trackColor = Color.White.copy(alpha = 0.35f),
          strokeCap = StrokeCap.Round
        )

        Spacer(modifier = Modifier.height(10.dp))

        // Lines count text
        Text(
          text = "$lineCount de 30 linhas",
          color = Color.White,
          fontSize = 13.sp,
          fontWeight = FontWeight.SemiBold
        )
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Card 2: Sua última redação (Em revisão)
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(20.dp))
        .clickable(onClick = onViewStatus)
        .testTag("card_ultima_redacao"),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
      shadowElevation = 1.dp
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(20.dp)
      ) {
        Row(
          modifier = Modifier.fillMaxWidth(),
          horizontalArrangement = Arrangement.SpaceBetween,
          verticalAlignment = Alignment.CenterVertically
        ) {
          Text(
            text = "Sua última redação",
            color = TextPrimary,
            fontSize = 17.sp,
            fontWeight = FontWeight.Bold
          )

          // Badge "Em revisão"
          Box(
            modifier = Modifier
              .clip(RoundedCornerShape(12.dp))
              .background(PinkLight)
              .padding(horizontal = 10.dp, vertical = 4.dp)
          ) {
            Text(
              text = "Em revisão",
              color = PinkPrimary,
              fontSize = 12.sp,
              fontWeight = FontWeight.SemiBold
            )
          }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Horizontal Stepper
        HorizontalStepper(currentStep = evaluation.currentStep)
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Two Columns Row: Meta do Feed & Esta Semana
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.spacedBy(14.dp)
    ) {
      // Left: Meta do Feed (Dark card)
      Surface(
        modifier = Modifier
          .weight(1f)
          .height(150.dp)
          .clip(RoundedCornerShape(20.dp))
          .clickable(onClick = onOpenFeed)
          .testTag("card_meta_feed"),
        shape = RoundedCornerShape(20.dp),
        color = DarkCardBg
      ) {
        Column(
          modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
          verticalArrangement = Arrangement.SpaceBetween
        ) {
          Text(
            text = "Meta do feed",
            color = Color(0xFF9CA3AF),
            fontSize = 13.sp,
            fontWeight = FontWeight.Medium
          )

          Text(
            text = "$viewedFeedCards / $totalFeedCards",
            color = Color.White,
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold
          )

          Column {
            // Progress bar
            LinearProgressIndicator(
              progress = { (viewedFeedCards.toFloat() / totalFeedCards.toFloat()).coerceIn(0f, 1f) },
              modifier = Modifier
                .fillMaxWidth()
                .height(5.dp)
                .clip(RoundedCornerShape(3.dp)),
              color = PinkPrimary,
              trackColor = Color(0xFF2D2D35),
              strokeCap = StrokeCap.Round
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
              text = "Faltam ${totalFeedCards - viewedFeedCards} cards",
              color = Color(0xFF9CA3AF),
              fontSize = 12.sp
            )
          }
        }
      }

      // Right: Esta semana (Practice days)
      Surface(
        modifier = Modifier
          .weight(1f)
          .height(150.dp)
          .clip(RoundedCornerShape(20.dp)),
        shape = RoundedCornerShape(20.dp),
        color = Color.White,
        border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
        shadowElevation = 1.dp
      ) {
        Column(
          modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
          verticalArrangement = Arrangement.SpaceBetween
        ) {
          Text(
            text = "Esta semana",
            color = TextSecondary,
            fontSize = 13.sp,
            fontWeight = FontWeight.Medium
          )

          // Mini bar chart (Mon to Sun)
          Row(
            modifier = Modifier
              .fillMaxWidth()
              .height(48.dp),
            horizontalArrangement = Arrangement.spacedBy(4.dp),
            verticalAlignment = Alignment.Bottom
          ) {
            val barHeights = listOf(0.4f, 0.7f, 0.55f, 0.9f, 0.2f, 0.15f, 0.1f)
            barHeights.forEachIndexed { index, heightFactor ->
              val isPracticed = index < 4 // Mon-Thu
              Box(
                modifier = Modifier
                  .weight(1f)
                  .height((48 * heightFactor).dp)
                  .clip(RoundedCornerShape(topStart = 4.dp, topEnd = 4.dp))
                  .background(if (isPracticed) PinkPrimary.copy(alpha = if (index == 3) 1f else 0.4f + index * 0.15f) else Color(0xFFE5E7EB))
              )
            }
          }

          Text(
            text = "4 dias de prática",
            color = TextPrimary,
            fontSize = 12.sp,
            fontWeight = FontWeight.Medium
          )
        }
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Tema da semana card
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .clip(RoundedCornerShape(20.dp))
        .clickable(onClick = onOpenThemeProposal)
        .testTag("card_tema_semana"),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
      shadowElevation = 1.dp
    ) {
      Row(
        modifier = Modifier
          .fillMaxWidth()
          .padding(18.dp),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
      ) {
        Column(modifier = Modifier.weight(1f)) {
          Text(
            text = "Tema da semana",
            color = PinkPrimary,
            fontSize = 12.sp,
            fontWeight = FontWeight.SemiBold
          )
          Spacer(modifier = Modifier.height(4.dp))
          Text(
            text = "Saúde mental dos jovens na era digital",
            color = TextPrimary,
            fontSize = 16.sp,
            fontWeight = FontWeight.Bold,
            lineHeight = 22.sp
          )
        }

        Icon(
          imageVector = Icons.AutoMirrored.Outlined.ArrowForwardIos,
          contentDescription = "Ver proposta do tema",
          tint = TextMuted,
          modifier = Modifier.size(16.dp)
        )
      }
    }
  }
}
